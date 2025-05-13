
import React from 'react';
import { Producto } from '@/types/orden';
import { useOrdenes } from '@/context/OrdenesContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';

interface ProductoItemProps {
  producto: Producto;
  ordenId: string;
}

const ProductoItem: React.FC<ProductoItemProps> = ({ producto, ordenId }) => {
  const { eliminarProducto } = useOrdenes();
  const subtotal = producto.cantidad * producto.precioUnitario;

  return (
    <div className="flex items-center justify-between p-3 border-b last:border-0 animate-fade-in">
      <div className="flex items-center space-x-4">
        <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-medium">
          {producto.cantidad}
        </span>
        <div>
          <p className="font-medium">{producto.nombre}</p>
          <p className="text-sm text-muted-foreground">{formatCurrency(producto.precioUnitario)} c/u</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="font-semibold">{formatCurrency(subtotal)}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => eliminarProducto(ordenId, producto.id)}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductoItem;
