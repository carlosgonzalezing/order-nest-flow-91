
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ListOrdered, Plus, LogOut, ChefHat, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Sesión cerrada",
      description: "Has salido del sistema"
    });
    navigate('/login');
  };
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={cn(
        "h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 animate-fade-in",
        className
      )}
    >
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex flex-col items-center mb-2">
          <img 
            src="/lovable-uploads/939ee94a-50f7-4b8f-b4f3-c00aabfe39e1.png" 
            alt="RESTAURANTE EL SAYAN" 
            className="h-20 w-20 mb-2 animate-scale"
          />
          <h1 className="text-xl font-bold text-sidebar-foreground text-center">
            RESTAURANTE<br/>EL SAYAN
          </h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={cn(
                "flex items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors hover:scale-105 transform duration-200",
                isActive('/') && "bg-sidebar-accent font-bold"
              )}
            >
              <ListOrdered className="mr-2 h-5 w-5" />
              Órdenes Activas
            </Link>
          </li>
          <li>
            <Link
              to="/nueva-orden"
              className={cn(
                "flex items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors hover:scale-105 transform duration-200",
                isActive('/nueva-orden') && "bg-sidebar-accent font-bold"
              )}
            >
              <Plus className="mr-2 h-5 w-5" />
              Nueva Orden
            </Link>
          </li>
          <li>
            <Link
              to="/logo-comentarios"
              className={cn(
                "flex items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors hover:scale-105 transform duration-200",
                isActive('/logo-comentarios') && "bg-sidebar-accent font-bold"
              )}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Logo y Comentarios
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors hover:text-accent"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
      
      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/70">
        Sistema de Gestión de Pedidos
        <div className="mt-1 text-center text-xs font-bold">RESTAURANTE EL SAYAN</div>
      </div>
    </div>
  );
};

export default Sidebar;
