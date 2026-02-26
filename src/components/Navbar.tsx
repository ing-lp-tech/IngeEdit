import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/IngeEdit.png" alt="IngeEdit Logo" className="h-8 w-auto transition-transform group-hover:scale-105" />
          <img src="/textEditLogo1.png" alt="IngeEdit" className="h-6 w-auto transition-opacity group-hover:opacity-80" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {isLanding && (
            <>
              <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
              <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contacto</a>
            </>
          )}
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Iniciar Sesión
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border/30 p-4 space-y-3 animate-fade-in">
          {isLanding && (
            <>
              <a href="#servicios" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">Servicios</a>
              <a href="#contacto" onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">Contacto</a>
            </>
          )}
          <Link to="/login" onClick={() => setOpen(false)} className="block text-sm text-primary">Iniciar Sesión</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
