import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, type Perfil } from '@/lib/supabase';

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Retry fetching perfil up to 5 times (trigger may be slightly delayed)
    const fetchPerfil = useCallback(async (userId: string, retries = 5): Promise<Perfil | null> => {
        for (let i = 0; i < retries; i++) {
            const { data } = await supabase
                .from('perfiles')
                .select('*')
                .eq('id', userId)
                .single();
            if (data) {
                setPerfil(data as Perfil);
                return data as Perfil;
            }
            if (i < retries - 1) await new Promise(r => setTimeout(r, 600));
        }
        return null;
    }, []);

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) await fetchPerfil(session.user.id);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchPerfil(session.user.id);
            } else {
                setPerfil(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [fetchPerfil]);

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const p = await fetchPerfil(data.user.id);
        if (!p) throw new Error('No se encontró tu perfil. Contacta al administrador.');
        if (p.rol === 'admin') {
            navigate('/admin');
        } else if (!p.activo) {
            // Sign out inactive users immediately
            await supabase.auth.signOut();
            throw new Error('Tu cuenta está pendiente de aprobación. El administrador te habilitará pronto.');
        } else {
            navigate('/dashboard');
        }
    };

    const signUp = async (email: string, password: string, nombre: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { nombre } },
        });
        if (error) throw error;
        if (data.user) {
            const p = await fetchPerfil(data.user.id);
            if (p?.rol === 'admin') {
                navigate('/admin');
            } else {
                // Sign out and show pending message
                await supabase.auth.signOut();
                throw new Error('¡Registro exitoso! Tu cuenta está pendiente de aprobación. Te avisaremos cuando esté activa.');
            }
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return { user, perfil, loading, signIn, signUp, signOut };
}
