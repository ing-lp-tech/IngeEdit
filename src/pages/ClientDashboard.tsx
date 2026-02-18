import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus, ExternalLink, FolderOpen, Clock, CheckCircle, Edit3, Send, LogOut, AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase, type Proyecto } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

const estadoConfig = {
  Recibido: { color: "bg-muted text-muted-foreground", icon: Clock },
  Editando: { color: "bg-primary/10 text-primary border-primary/20", icon: Edit3 },
  Revisión: { color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Send },
  Entregado: { color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle },
};

const ClientDashboard = () => {
  const { user, perfil, signOut } = useAuth();
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLink, setNewLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!user) return;
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    const { data, error } = await supabase
      .from("proyectos")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProjects(data as Proyecto[]);
    setLoadingProjects(false);
  };

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormError("");
    setSaving(true);
    const { error } = await supabase.from("proyectos").insert([
      {
        cliente_id: user.id,
        nombre_proyecto: newName,
        drive_link: newLink,
        estado: "Recibido",
      },
    ]);
    if (error) {
      setFormError("No se pudo crear el proyecto. Intenta de nuevo.");
    } else {
      setNewName("");
      setNewLink("");
      setShowNew(false);
      fetchProjects();
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center">
            <img src="/IngeEdit.png" alt="IngeEdit Logo" className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {perfil?.nombre || user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground gap-1"
            >
              <LogOut className="h-3.5 w-3.5" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mis Proyectos</h1>
            <p className="text-sm text-muted-foreground mt-1">Gestiona tus proyectos de edición</p>
          </div>
          <Button
            onClick={() => { setShowNew(!showNew); setFormError(""); }}
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
          >
            <Plus className="h-4 w-4" /> Nuevo
          </Button>
        </div>

        {/* New project form */}
        {showNew && (
          <form onSubmit={addProject} className="glass rounded-xl p-5 mb-6 space-y-4 animate-fade-in glow-border">
            <h3 className="font-medium text-foreground">Nuevo Proyecto</h3>
            <Input
              placeholder="Nombre del proyecto"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
            />
            <Input
              placeholder="Link de carpeta de Google Drive"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              required
              type="url"
              className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
            />
            {formError && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={saving} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {saving ? "Guardando..." : "Crear Proyecto"}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowNew(false)} className="text-muted-foreground">
                Cancelar
              </Button>
            </div>
          </form>
        )}

        {/* Projects list */}
        {loadingProjects ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => {
              const config = estadoConfig[p.estado];
              const Icon = config.icon;
              return (
                <div key={p.id} className="glass-hover rounded-xl p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="p-2 rounded-lg bg-primary/5">
                      <FolderOpen className="h-5 w-5 text-primary/60" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground text-sm truncate">{p.nombre_proyecto}</h3>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{p.drive_link}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="outline" className={`${config.color} border gap-1 text-xs`}>
                      <Icon className="h-3 w-3" />
                      {p.estado}
                    </Badge>
                    <a href={p.drive_link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-1">
                        <ExternalLink className="h-3.5 w-3.5" /> Abrir en Drive
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loadingProjects && projects.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <FolderOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>No tienes proyectos aún. ¡Crea el primero!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;
