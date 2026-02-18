import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Perfil = {
    id: string;
    email: string;
    nombre: string | null;
    rol: 'admin' | 'cliente';
    activo: boolean;
    created_at: string;
};

export type Proyecto = {
    id: string;
    cliente_id: string;
    nombre_proyecto: string;
    drive_link: string;
    estado: 'Recibido' | 'Editando' | 'Revisión' | 'Entregado';
    created_at: string;
    perfiles?: { nombre: string | null; email: string };
};

export type Lead = {
    id: string;
    nombre: string;
    email: string;
    consulta: string;
    created_at: string;
};

export type Cita = {
    id: string;
    cliente_id: string | null;
    nombre_cliente: string;
    fecha_hora: string;
    duracion: number;
    estado: 'Pendiente' | 'Confirmada' | 'Cancelada';
    created_at: string;
};

export type Finanza = {
    id: string;
    proyecto_id: string;
    monto_total: number;
    pagado: boolean;
    created_at: string;
    proyectos?: { nombre_proyecto: string; perfiles?: { nombre: string | null; email: string } };
};
