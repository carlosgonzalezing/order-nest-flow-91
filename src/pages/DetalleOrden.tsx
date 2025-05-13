
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrdenes } from '@/context/OrdenesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductoItem from '@/components/ProductoItem';
import SelectorProductos from '@/components/SelectorProductos';
import { ArrowLeft, Trash2, Restaurant } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { MenuItem } from '@/data/menuItems';

const DetalleOrden: React.FC = () => {
  const { ordenId } = useParams<{ ordenId: string }>();
  const navigate = useNavigate();
  const { obtenerOrden, calcularTotal, agregarProducto, eliminarOrden } = useOrdenes();
  
  const orden = obtenerOrden(ordenId || '');
  
  if (!orden) {
    return (
      <div className="text-center p-12">
        <p className="text-xl text-muted-foreground">Orden no encontrada</p>
        <Button 
          className="mt-4"
          variant="outline"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a órdenes
        </Button>
      </div>
    );
  }
  
  const handleAgregarProducto = (producto: MenuItem, cantidad: number) => {
    agregarProducto(ordenId || '', {
      nombre: producto.nombre,
      cantidad,
      precioUnitario: producto.precioUnitario
    });
  };
  
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparando':
        return 'bg-blue-100 text-blue-800';
      case 'listo':
        return 'bg-green-100 text-green-800';
      case 'entregado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <h1 className="text-3xl font-bold">Detalle de Orden</h1>
        </div>
        <div className="flex items-center gap-2">
          <Restaurant className="h-6 w-6 text-accent" />
          <span className="font-bold">RESTAURANTE EL SAYAN</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="bg-restaurant-50">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    Mesa {orden.mesa}
                    <Badge 
                      variant="outline" 
                      className={`ml-2 ${getEstadoColor(orden.estado)}`}
                    >
                      {orden.estado}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Cliente: {orden.cliente}</p>
                  <p className="text-sm text-muted-foreground">
                    Fecha: {orden.fecha.toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    eliminarOrden(orden.id);
                    navigate('/');
                  }}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar orden
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {orden.productos.length === 0 ? (
                <p className="text-center p-6 text-muted-foreground">
                  No hay productos en esta orden
                </p>
              ) : (
                <div>
                  {orden.productos.map((producto) => (
                    <ProductoItem 
                      key={producto.id} 
                      producto={producto} 
                      ordenId={orden.id} 
                    />
                  ))}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between border-t p-4">
              <span className="text-muted-foreground">
                {orden.productos.length} productos
              </span>
              <div className="font-bold text-xl">
                Total: {formatCurrency(calcularTotal(orden.productos))}
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Agregar Producto</CardTitle>
            </CardHeader>
            <SelectorProductos onSelectProducto={handleAgregarProducto} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetalleOrden;
