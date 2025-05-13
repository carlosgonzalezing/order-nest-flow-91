
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Orden, Producto, NuevaOrden } from '@/types/orden';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

interface OrdenesContextType {
  ordenes: Orden[];
  agregarOrden: (nuevaOrden: NuevaOrden) => Orden;
  agregarProducto: (ordenId: string, producto: Omit<Producto, 'id'>) => void;
  eliminarProducto: (ordenId: string, productoId: string) => void;
  eliminarOrden: (ordenId: string) => void;
  actualizarEstadoOrden: (ordenId: string, nuevoEstado: Orden['estado']) => void;
  obtenerOrden: (ordenId: string) => Orden | undefined;
  calcularTotal: (productos: Producto[]) => number;
}

const OrdenesContext = createContext<OrdenesContextType | undefined>(undefined);

// Hook personalizado para utilizar el contexto
export const useOrdenes = () => {
  const context = useContext(OrdenesContext);
  if (context === undefined) {
    throw new Error('useOrdenes debe ser utilizado dentro de un OrdenesProvider');
  }
  return context;
};

export const OrdenesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);

  // Cargar órdenes del localStorage al iniciar
  useEffect(() => {
    const ordenesGuardadas = localStorage.getItem('ordenes');
    if (ordenesGuardadas) {
      try {
        const parsedOrdenes = JSON.parse(ordenesGuardadas);
        
        // Convertir strings de fecha a objetos Date
        const ordenesConFechas = parsedOrdenes.map((orden: any) => ({
          ...orden,
          fecha: new Date(orden.fecha)
        }));
        
        setOrdenes(ordenesConFechas);
      } catch (error) {
        console.error('Error al cargar las órdenes', error);
      }
    }
  }, []);

  // Guardar órdenes en localStorage cuando cambian
  useEffect(() => {
    if (ordenes.length > 0) {
      localStorage.setItem('ordenes', JSON.stringify(ordenes));
    }
  }, [ordenes]);

  const agregarOrden = (nuevaOrden: NuevaOrden): Orden => {
    const orden: Orden = {
      ...nuevaOrden,
      id: uuidv4(),
      fecha: new Date(),
      productos: [],
    };

    setOrdenes((ordenesActuales) => [...ordenesActuales, orden]);
    toast({
      title: 'Orden creada',
      description: `Mesa ${nuevaOrden.mesa} - ${nuevaOrden.cliente}`,
    });
    return orden;
  };

  const agregarProducto = (ordenId: string, producto: Omit<Producto, 'id'>) => {
    setOrdenes((ordenesActuales) =>
      ordenesActuales.map((orden) => {
        if (orden.id === ordenId) {
          // Crear nuevo producto con ID
          const nuevoProducto: Producto = {
            ...producto,
            id: uuidv4(),
          };
          
          return {
            ...orden,
            productos: [...orden.productos, nuevoProducto],
          };
        }
        return orden;
      })
    );
    toast({
      title: 'Producto añadido',
      description: `${producto.cantidad}x ${producto.nombre}`,
    });
  };

  const eliminarProducto = (ordenId: string, productoId: string) => {
    setOrdenes((ordenesActuales) =>
      ordenesActuales.map((orden) => {
        if (orden.id === ordenId) {
          return {
            ...orden,
            productos: orden.productos.filter((p) => p.id !== productoId),
          };
        }
        return orden;
      })
    );
    toast({
      title: 'Producto eliminado',
      variant: 'destructive',
    });
  };

  const eliminarOrden = (ordenId: string) => {
    setOrdenes((ordenesActuales) => 
      ordenesActuales.filter((orden) => orden.id !== ordenId)
    );
    toast({
      title: 'Orden eliminada',
      variant: 'destructive',
    });
  };

  const actualizarEstadoOrden = (ordenId: string, nuevoEstado: Orden['estado']) => {
    setOrdenes((ordenesActuales) =>
      ordenesActuales.map((orden) => {
        if (orden.id === ordenId) {
          return {
            ...orden,
            estado: nuevoEstado,
          };
        }
        return orden;
      })
    );
    toast({
      title: 'Estado actualizado',
      description: `La orden ahora está: ${nuevoEstado}`,
    });
  };

  const obtenerOrden = (ordenId: string) => {
    return ordenes.find((orden) => orden.id === ordenId);
  };

  const calcularTotal = (productos: Producto[]) => {
    return productos.reduce(
      (total, producto) => total + producto.cantidad * producto.precioUnitario,
      0
    );
  };

  const value = {
    ordenes,
    agregarOrden,
    agregarProducto,
    eliminarProducto,
    eliminarOrden,
    actualizarEstadoOrden,
    obtenerOrden,
    calcularTotal
  };

  return (
    <OrdenesContext.Provider value={value}>
      {children}
    </OrdenesContext.Provider>
  );
};
