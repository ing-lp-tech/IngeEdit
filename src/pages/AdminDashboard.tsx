import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users, FolderOpen, CalendarDays, DollarSign, LogOut,
  ExternalLink, Clock, Edit3, Send, CheckCircle, Mail, MessageSquare,
  UserCheck, UserX, ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase, type Lead, type Proyecto, type Cita, type Finanza, type Perfil } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

type Tab = "usuarios" | "leads" | "proyectos" | "citas" | "finanzas";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "usuarios", label: "Usuarios", icon: Users },
  { id: "leads", label: "Leads", icon: Mail },
  { id: "proyectos", label: "Proyectos", icon: FolderOpen },
  { id: "citas", label: "Citas", icon: CalendarDays },
  { id: "finanzas", label: "Finanzas", icon: DollarSign },
];

const estadoOptions = ["Recibido", "Editando", "Revisión", "Entregado"] as const;
type Estado = (typeof estadoOptions)[number];

const estadoConfig: Record<Estado, { color: string; icon: React.ElementType }> = {
  Recibido: { color: "bg-muted text-muted-foreground", icon: Clock },
  Editando: { color: "bg-primary/10 text-primary border-primary/20", icon: Edit3 },
  Revisión: { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Send },
  Entregado: { color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle },
};

const AdminDashboard = () => {
  const { signOut, perfil: adminPerfil } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("usuarios");
  const [usuarios, setUsuarios] = useState<Perfil[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [finanzas, setFinanzas] = useState<Finanza[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (tab: Tab) => {
    setLoading(true);
    if (tab === "usuarios") {
      const { data } = await supabase
        .from("perfiles")
        .select("*")
        .eq("rol", "cliente")
        .order("created_at", { ascending: false });
      if (data) setUsuarios(data as Perfil[]);
    } else if (tab === "leads") {
      const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (data) setLeads(data as Lead[]);
    } else if (tab === "proyectos") {
      const { data } = await supabase
        .from("proyectos")
        .select("*, perfiles(nombre, email)")
        .order("created_at", { ascending: false });
      if (data) setProjects(data as Proyecto[]);
    } else if (tab === "citas") {
      const { data } = await supabase.from("citas").select("*").order("fecha_hora", { ascending: true });
      if (data) setCitas(data as Cita[]);
    } else if (tab === "finanzas") {
      const { data } = await supabase
        .from("finanzas")
        .select("*, proyectos(nombre_proyecto, perfiles(nombre, email))")
        .order("created_at", { ascending: false });
      if (data) setFinanzas(data as Finanza[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, fetchData]);

  const toggleActivo = async (id: string, currentValue: boolean) => {
    await supabase.from("perfiles").update({ activo: !currentValue }).eq("id", id);
    setUsuarios(usuarios.map((u) => (u.id === id ? { ...u, activo: !currentValue } : u)));
  };

  const updateEstado = async (id: string, estado: Estado) => {
    await supabase.from("proyectos").update({ estado }).eq("id", id);
    setProjects(projects.map((p) => (p.id === id ? { ...p, estado } : p)));
  };

  const togglePagado = async (id: string, currentValue: boolean) => {
    await supabase.from("finanzas").update({ pagado: !currentValue }).eq("id", id);
    setFinanzas(finanzas.map((f) => (f.id === id ? { ...f, pagado: !currentValue } : f)));
  };

  const totalIngresos = finanzas.reduce((acc, f) => acc + Number(f.monto_total), 0);
  const totalPagado = finanzas.filter((f) => f.pagado).reduce((acc, f) => acc + Number(f.monto_total), 0);

  const pendientes = usuarios.filter(u => !u.activo).length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border/30 bg-card/40 backdrop-blur-xl hidden md:flex flex-col shrink-0">
        <div className="p-4 border-b border-border/30">
          <Link to="/" className="flex items-center">
            <img src="/IngeEdit.png" alt="IngeEdit Logo" className="h-7 w-auto" />
          </Link>
        </div>
        <div className="px-3 py-2 border-b border-border/30">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">Super Admin</span>
          </div>
          <p className="text-xs text-muted-foreground px-2 truncate">{adminPerfil?.email}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === "usuarios" && pendientes > 0 && (
                <span className="ml-auto bg-amber-500 text-amber-950 text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                  {pendientes}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full justify-start text-muted-foreground hover:text-foreground gap-2"
          >
            <LogOut className="h-3.5 w-3.5" /> Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 border-b border-border/30 bg-card/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 p-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
              {tab.id === "usuarios" && pendientes > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-amber-950 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {pendientes}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 mt-14 md:mt-0 overflow-auto">
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Usuarios */}
        {!loading && activeTab === "usuarios" && (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold mb-1">Usuarios</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Gestiona el acceso de los clientes registrados
            </p>
            {usuarios.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay usuarios registrados aún.</p>
            ) : (
              <div className="space-y-3">
                {usuarios.map((u) => (
                  <div key={u.id} className="glass-hover rounded-xl p-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{u.nombre || "Sin nombre"}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" /> {u.email}
                      </div>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">
                        Registrado: {new Date(u.created_at).toLocaleDateString("es-AR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge
                        variant="outline"
                        className={`text-xs ${u.activo
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                      >
                        {u.activo ? "Activo" : "Pendiente"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActivo(u.id, u.activo)}
                        className={`text-xs gap-1 ${u.activo
                          ? "border-destructive/30 text-destructive hover:bg-destructive/10"
                          : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                          }`}
                      >
                        {u.activo ? (
                          <><UserX className="h-3 w-3" /> Desactivar</>
                        ) : (
                          <><UserCheck className="h-3 w-3" /> Activar</>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Leads */}
        {!loading && activeTab === "leads" && (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold mb-1">Leads</h1>
            <p className="text-sm text-muted-foreground mb-6">Consultas de posibles clientes</p>
            {leads.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay leads aún.</p>
            ) : (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="glass-hover rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground text-sm">{lead.nombre}</h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" /> {lead.email}
                        </div>
                        <div className="flex items-start gap-2 mt-2 text-xs text-muted-foreground">
                          <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                          <span>{lead.consulta}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground/60 shrink-0">
                        {new Date(lead.created_at).toLocaleDateString("es-AR")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Proyectos */}
        {!loading && activeTab === "proyectos" && (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold mb-1">Proyectos</h1>
            <p className="text-sm text-muted-foreground mb-6">Gestiona el estado de los proyectos</p>
            {projects.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay proyectos aún.</p>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => {
                  const config = estadoConfig[p.estado];
                  return (
                    <div key={p.id} className="glass-hover rounded-xl p-5">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="min-w-0">
                          <h3 className="font-medium text-foreground text-sm">{p.nombre_proyecto}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {p.perfiles?.nombre || p.perfiles?.email || "Cliente"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Select value={p.estado} onValueChange={(v) => updateEstado(p.id, v as Estado)}>
                            <SelectTrigger className="w-[140px] h-8 text-xs bg-secondary/30 border-border/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {estadoOptions.map((e) => (
                                <SelectItem key={e} value={e} className="text-xs">{e}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <a href={p.drive_link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1 text-xs">
                              <ExternalLink className="h-3.5 w-3.5" /> Drive
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Citas */}
        {!loading && activeTab === "citas" && (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold mb-1">Citas</h1>
            <p className="text-sm text-muted-foreground mb-6">Calendario de reuniones con clientes</p>
            {citas.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay citas agendadas.</p>
            ) : (
              <div className="space-y-3">
                {citas.map((c) => (
                  <div key={c.id} className="glass-hover rounded-xl p-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{c.nombre_cliente}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(c.fecha_hora).toLocaleString("es-AR")} · {c.duracion} min
                      </p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${c.estado === "Confirmada"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                      {c.estado}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Finanzas */}
        {!loading && activeTab === "finanzas" && (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold mb-1">Finanzas</h1>
            <p className="text-sm text-muted-foreground mb-6">Control de pagos por proyecto</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Total Facturado</p>
                <p className="text-xl font-bold text-foreground">${totalIngresos.toLocaleString("es-AR")}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Cobrado</p>
                <p className="text-xl font-bold text-emerald-400">${totalPagado.toLocaleString("es-AR")}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Pendiente</p>
                <p className="text-xl font-bold text-amber-400">${(totalIngresos - totalPagado).toLocaleString("es-AR")}</p>
              </div>
            </div>
            {finanzas.length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay registros financieros aún.</p>
            ) : (
              <div className="space-y-3">
                {finanzas.map((f) => (
                  <div key={f.id} className="glass-hover rounded-xl p-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{f.proyectos?.nombre_proyecto || "Proyecto"}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {f.proyectos?.perfiles?.nombre || f.proyectos?.perfiles?.email || "Cliente"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-medium text-foreground text-sm">
                        ${Number(f.monto_total).toLocaleString("es-AR")}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePagado(f.id, f.pagado)}
                        className={`text-xs ${f.pagado
                          ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                          : "border-border/50 text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        {f.pagado ? <><CheckCircle className="h-3 w-3 mr-1" /> Pagado</> : "Marcar Pagado"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
