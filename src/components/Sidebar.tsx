
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ListOrdered, Plus } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border",
        className
      )}
    >
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground flex items-center">
          <ListOrdered className="mr-2" />
          RestauranteGPT
        </h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
            >
              <ListOrdered className="mr-2 h-5 w-5" />
              Órdenes Activas
            </Link>
          </li>
          <li>
            <Link
              to="/nueva-orden"
              className="flex items-center px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
            >
              <Plus className="mr-2 h-5 w-5" />
              Nueva Orden
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/70">
        Sistema de Gestión de Pedidos
      </div>
    </div>
  );
};

export default Sidebar;
