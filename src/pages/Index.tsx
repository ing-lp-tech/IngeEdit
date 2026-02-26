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

      {/* Logo banner between hero and services */}
      <div className="relative z-10 flex justify-center py-4 px-1">
        <img src="/textEditLogo1.png" alt="IngeEdit" className="h-20 w-auto opacity-90 animate-fade-in" />
      </div>

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

      {/* About Us */}
      <section id="nosotros" className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
                <img
                  src="/IngeEdit.png"
                  alt="IngeEdit"
                  className="relative z-10 w-48 h-48 object-contain rounded-2xl"
                />
              </div>
            </div>
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">
                Sobre <span className="gradient-text">Nosotros</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Somos un equipo apasionado por la edición de video y la narrativa visual.
                Nos especializamos en transformar material en bruto en contenido profesional
                que conecta con audiencias y potencia marcas.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Con años de experiencia en post-producción, trabajamos con creadores de contenido,
                empresas y marcas personales que buscan destacar en el mundo digital.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { num: "+120", label: "Proyectos" },
                  { num: "+50", label: "Clientes" },
                  { num: "4.9★", label: "Valoración" },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stat.num}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="relative z-10 py-16 px-4 border-t border-border/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-2">Síguenos</h2>
          <p className="text-muted-foreground text-sm mb-10">Mirá nuestro trabajo en redes</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                name: "Instagram",
                url: "https://instagram.com/ingeedit",
                icon: (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
                color: "hover:border-pink-500/50 hover:text-pink-400",
              },
              {
                name: "TikTok",
                url: "https://tiktok.com/@ingeedit",
                icon: (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                  </svg>
                ),
                color: "hover:border-white/30 hover:text-white",
              },
              {
                name: "YouTube",
                url: "https://youtube.com/@ingeedit",
                icon: (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                ),
                color: "hover:border-red-500/50 hover:text-red-400",
              },
              {
                name: "WhatsApp",
                url: "https://wa.me/5491162020911?text=Hola%20IngeEdit%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20de%20edici%C3%B3n%20de%20video%20%F0%9F%8E%AC",
                icon: (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
                color: "hover:border-green-500/50 hover:text-green-400",
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-hover flex items-center gap-3 px-6 py-3 rounded-xl border border-border/30 text-muted-foreground transition-all duration-200 ${social.color}`}
              >
                {social.icon}
                <span className="text-sm font-medium">{social.name}</span>
              </a>
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
      <footer className="relative z-10 border-t border-border/30 py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/IngeEdit.png" alt="IngeEdit" className="h-8 w-auto" />
              <img src="/textEditLogo1.png" alt="IngeEdit" className="h-6 w-auto opacity-80" />
            </div>
            <div className="flex items-center gap-6">
              <a href="#servicios" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
              <a href="#nosotros" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Nosotros</a>
              <a href="#contacto" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Contacto</a>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 IngeEdit. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5491162020911?text=Hola%20IngeEdit%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20de%20edici%C3%B3n%20de%20video%20%F0%9F%8E%AC"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-200 hover:scale-105 group"
      >
        <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="text-sm font-medium max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Escribinos
        </span>
      </a>
    </div>
  );
};

export default Index;
