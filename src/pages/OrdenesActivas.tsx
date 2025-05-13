
import React, { useState } from 'react';
import { useOrdenes } from '@/context/OrdenesContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Trash2, Eye } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

const OrdenesActivas: React.FC = () => {
  const { ordenes, eliminarOrden, calcularTotal, actualizarEstadoOrden } = useOrdenes();
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState<string>('todos');
  
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

  const ordenesFiltradas = ordenes.filter(orden => {
    if (filtro === 'todos') return true;
    return orden.estado === filtro;
  });
  
  const verDetalle = (ordenId: string) => {
    navigate(`/orden/${ordenId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Órdenes Activas</h1>
        <div className="flex items-center gap-4">
          <Select value={filtro} onValueChange={setFiltro}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="preparando">Preparando</SelectItem>
              <SelectItem value="listo">Listo</SelectItem>
              <SelectItem value="entregado">Entregado</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => navigate('/nueva-orden')} className="bg-accent hover:bg-accent/90">
            Nueva Orden
          </Button>
        </div>
      </div>
      
      {ordenesFiltradas.length === 0 ? (
        <div className="text-center p-12">
          <p className="text-xl text-muted-foreground">No hay órdenes activas</p>
          <Button 
            className="mt-4 bg-accent hover:bg-accent/90" 
            onClick={() => navigate('/nueva-orden')}
          >
            Crear nueva orden
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordenesFiltradas.map((orden) => (
            <Card key={orden.id} className="overflow-hidden animate-fade-in">
              <CardHeader className="bg-restaurant-50">
                <div className="flex justify-between items-start">
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
                    <p className="text-sm text-muted-foreground mt-1">{orden.cliente}</p>
                  </div>
                  <Select 
                    value={orden.estado} 
                    onValueChange={(valor) => actualizarEstadoOrden(orden.id, valor as any)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Cambiar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="preparando">Preparando</SelectItem>
                      <SelectItem value="listo">Listo</SelectItem>
                      <SelectItem value="entregado">Entregado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="font-medium">Productos: {orden.productos.length}</p>
                <ul className="mt-2 space-y-1">
                  {orden.productos.slice(0, 2).map((producto) => (
                    <li key={producto.id} className="text-sm text-muted-foreground">
                      {producto.cantidad}x {producto.nombre}
                    </li>
                  ))}
                  {orden.productos.length > 2 && (
                    <li className="text-sm text-muted-foreground italic">
                      + {orden.productos.length - 2} más...
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="font-bold">
                  Total: {formatCurrency(calcularTotal(orden.productos))}
                </div>
                <div className="space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => verDetalle(orden.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => eliminarOrden(orden.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdenesActivas;
