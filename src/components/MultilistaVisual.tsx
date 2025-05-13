
import React, { useEffect, useState, useRef } from 'react';
import { useOrdenes } from '@/context/OrdenesContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MultilistaPedidos, NodoOrden, NodoProducto } from '@/utils/MultilistaEducativa';
import { formatCurrency } from '@/lib/formatters';

// Componente para visualizar un nodo producto
const NodoProductoVisual: React.FC<{ producto: NodoProducto, isLast: boolean }> = ({ producto, isLast }) => {
  return (
    <div className="pl-12">
      <div className="relative">
        <div className="absolute left-0 -ml-[22px] mt-1 h-full w-[2px] bg-accent/50">
          {isLast && <div className="absolute bottom-0 h-4 w-[2px] bg-white"></div>}
        </div>
        <div className="absolute left-0 -ml-[24px] mt-1 h-6 w-6 rounded-full border-2 border-accent bg-white flex items-center justify-center text-xs font-semibold">
          P
        </div>
        <div className="bg-accent/10 border border-accent/20 rounded-md p-3 mb-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{producto.nombre}</h4>
              <div className="text-sm text-muted-foreground">
                Cantidad: {producto.cantidad} × {formatCurrency(producto.precioUnitario)}
              </div>
            </div>
            <div className="font-bold">
              {formatCurrency(producto.cantidad * producto.precioUnitario)}
            </div>
          </div>
          <div className="mt-2 text-xs flex items-center">
            <span className="bg-accent/20 px-2 py-1 rounded">ID: {producto.id.substring(0, 8)}...</span>
            <span className="ml-auto text-muted-foreground">
              {producto.siguiente ? "→ siguiente producto" : "→ null (fin de la lista)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para visualizar un nodo orden
const NodoOrdenVisual: React.FC<{ orden: NodoOrden, isLast: boolean }> = ({ orden, isLast }) => {
  const productos = orden.obtenerProductos();

  return (
    <div className="mb-4">
      <div className="relative">
        <div className={`absolute left-4 top-[64px] h-full w-[2px] bg-primary/50 ${isLast ? 'hidden' : ''}`}></div>
        <div className="bg-primary/10 border-2 border-primary/30 rounded-md p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold text-lg">Orden - Mesa {orden.mesa}</h3>
              <p className="text-sm text-muted-foreground">Cliente: {orden.cliente}</p>
              <p className="text-xs text-muted-foreground">Fecha: {orden.fecha.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Estado: {orden.estado}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-primary/20 px-2 py-1 rounded text-xs">ID: {orden.id.substring(0, 8)}...</span>
              <span className="text-xs text-muted-foreground mt-1">
                {orden.siguiente ? "→ siguiente orden" : "→ null (fin de la lista)"}
              </span>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-primary/20">
            <div className="flex items-center">
              <span className="text-sm font-medium">primerProducto: </span>
              <span className="ml-2 text-sm text-muted-foreground">
                {productos.length > 0 ? "↓ (enlace vertical)" : "null"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {productos.map((producto, index) => (
        <NodoProductoVisual 
          key={producto.id} 
          producto={producto} 
          isLast={index === productos.length - 1} 
        />
      ))}
    </div>
  );
};

const MultilistaVisual: React.FC = () => {
  const { ordenes } = useOrdenes();
  const [multilista, setMultilista] = useState<MultilistaPedidos | null>(null);

  useEffect(() => {
    // Convertir las órdenes del contexto a nuestra estructura de multilista
    const nuevaMultilista = new MultilistaPedidos();
    nuevaMultilista.cargarDesdeDatos(ordenes);
    setMultilista(nuevaMultilista);
  }, [ordenes]);

  if (!multilista || multilista.obtenerOrdenes().length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visualización de Multilista</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No hay órdenes para visualizar. Crea algunas órdenes para ver la estructura de la multilista.
          </p>
        </CardContent>
      </Card>
    );
  }

  const ordenesNodos = multilista.obtenerOrdenes();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualización de Multilista de Órdenes y Productos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mb-4">
          <h3 className="font-bold">Estructura de Multilista</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Esta visualización muestra la implementación clásica de una multilista con nodos y punteros explícitos,
            donde cada orden contiene una lista enlazada de productos.
          </p>
          <div className="mt-4 text-sm flex items-center">
            <span className="font-medium">primeraOrden: </span>
            <span className="ml-2 text-muted-foreground">
              {ordenesNodos.length > 0 ? "↓ (referencia al primer nodo)" : "null"}
            </span>
          </div>
        </div>

        {ordenesNodos.map((orden, index) => (
          <NodoOrdenVisual 
            key={orden.id} 
            orden={orden} 
            isLast={index === ordenesNodos.length - 1} 
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MultilistaVisual;
