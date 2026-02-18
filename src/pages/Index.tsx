import BackgroundBeams from "@/components/BackgroundBeams";
import Navbar from "@/components/Navbar";
import LeadForm from "@/components/LeadForm";
import { Zap, Clock, Shield, ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Sparkles,
    title: "Edición Profesional",
    desc: "Cortes precisos, transiciones fluidas y narrativa visual que impacta.",
  },
  {
    icon: Zap,
    title: "Color Grading",
    desc: "Corrección de color cinematográfica para un look profesional.",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    desc: "Títulos animados, lower thirds y elementos visuales dinámicos.",
  },
  {
    icon: Clock,
    title: "Entrega Rápida",
    desc: "Tiempos de entrega competitivos sin sacrificar calidad.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundBeams />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex items-center px-4 pt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm animate-fade-in">
                <Play className="h-3 w-3" />
                Servicios de edición de video
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Tu visión,{" "}
                <span className="gradient-text">nuestra edición</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
                Transforma tu contenido en bruto en piezas audiovisuales profesionales.
                Sube tus archivos por Google Drive y nosotros nos encargamos del resto.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link to="/login">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8">
                    Comenzar Proyecto <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#contacto">
                  <Button size="lg" variant="outline" className="border-border/50 text-foreground hover:bg-secondary/50 px-8">
                    Contactar
                  </Button>
                </a>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {/* Glow behind image */}
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl scale-90" />
              <div className="relative">
                <img
                  src="/IngeEditPort.png"
                  alt="IngeEdit — Editor profesional"
                  className="relative z-10 w-full max-w-lg rounded-2xl shadow-2xl border border-primary/10"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 z-20 glass rounded-xl px-4 py-3 flex items-center gap-3 border border-primary/20 shadow-xl">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Disponible ahora</span>
                </div>
                {/* Floating stat */}
                <div className="absolute -top-4 -right-4 z-20 glass rounded-xl px-4 py-3 border border-primary/20 shadow-xl">
                  <p className="text-xs text-muted-foreground">Proyectos entregados</p>
                  <p className="text-xl font-bold text-primary">+120</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Servicios
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
            Todo lo que necesitas para llevar tu contenido al siguiente nivel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="glass-hover rounded-xl p-6 group animate-fade-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            ¿Cómo funciona?
          </h2>
          <div className="space-y-8">
            {[
              { step: "01", title: "Sube tu material", desc: "Comparte el link de tu carpeta de Google Drive con tus archivos en bruto." },
              { step: "02", title: "Definimos el estilo", desc: "Agendamos una cita para alinear la visión creativa de tu proyecto." },
              { step: "03", title: "Editamos y entregamos", desc: "Trabajamos en tu video y lo entregas listo para publicar." },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${0.15 * i}s` }}>
                <span className="text-3xl font-bold text-primary/30 font-mono shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Lead Form */}
      <section id="contacto" className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-md text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hablemos</h2>
          <p className="text-muted-foreground mb-10">
            Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.
          </p>
          <LeadForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <img src="/IngeEdit.png" alt="IngeEdit" className="h-7 w-auto opacity-80" />
          <p>© 2026 IngeEdit. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
