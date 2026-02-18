import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", consulta: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: dbError } = await supabase.from("leads").insert([
        {
          nombre: form.nombre,
          email: form.email,
          consulta: form.consulta,
        },
      ]);
      if (dbError) throw dbError;
      setSubmitted(true);
      setForm({ nombre: "", email: "", consulta: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: any) {
      setError("No se pudo enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <Input
        placeholder="Tu nombre"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        required
        className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
      />
      <Input
        type="email"
        placeholder="tu@email.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
      />
      <Textarea
        placeholder="Cuéntanos sobre tu proyecto..."
        value={form.consulta}
        onChange={(e) => setForm({ ...form, consulta: e.target.value })}
        required
        rows={4}
        className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50 resize-none"
      />

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        disabled={submitted || loading}
      >
        {submitted ? (
          <>
            <CheckCircle className="h-4 w-4" /> ¡Mensaje enviado!
          </>
        ) : loading ? (
          <>
            <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Enviar Consulta
          </>
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
