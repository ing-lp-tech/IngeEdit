import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, type Perfil } from '@/lib/supabase';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role?: 'admin' | 'cliente';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState<Perfil | null>(null);
    const [noSession, setNoSession] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (!session) {
                setNoSession(true);
                setLoading(false);
                return;
            }
            const { data } = await supabase
                .from('perfiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            setPerfil(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (noSession) return <Navigate to="/login" replace />;

    if (role && perfil?.rol !== role) {
        return <Navigate to={perfil?.rol === 'admin' ? '/admin' : '/dashboard'} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
