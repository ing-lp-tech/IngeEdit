import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundBeams from "@/components/BackgroundBeams";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(
        err.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos."
          : err.message === "User already registered"
            ? "Este email ya está registrado."
            : err.message || "Ocurrió un error. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-4">
      <BackgroundBeams />

      <div className="relative z-10 w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center mb-10">
          <img src="/IngeEdit.png" alt="IngeEdit Logo" className="h-12 w-auto" />
        </Link>

        <div className="glass rounded-xl p-6 glow-border">
          <h2 className="text-xl font-semibold text-center mb-6">
            {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <Input
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
              />
            )}
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-secondary/50 border-border/50 focus:border-primary/50 placeholder:text-muted-foreground/50"
            />

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  {isRegister ? "Creando cuenta..." : "Entrando..."}
                </span>
              ) : (
                <>
                  {isRegister ? "Registrarse" : "Entrar"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
              className="text-primary hover:underline"
            >
              {isRegister ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
