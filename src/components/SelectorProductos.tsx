
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MenuItem, buscarProductos, getProductosPorCategoria, menuItems } from '@/data/menuItems';

interface SelectorProductosProps {
  onSelectProducto: (producto: MenuItem, cantidad: number) => void;
}

const SelectorProductos: React.FC<SelectorProductosProps> = ({ onSelectProducto }) => {
  const [busqueda, setBusqueda] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [categoriaActiva, setCategoriaActiva] = useState<MenuItem['categoria']>('principal');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Productos filtrados según la búsqueda o categoría
  const productosFiltrados = busqueda 
    ? buscarProductos(busqueda)
    : getProductosPorCategoria(categoriaActiva);

  const handleSeleccionarProducto = (id: string) => {
    setSelectedProductId(id);
    const producto = menuItems.find(item => item.id === id);
    if (producto) {
      setCantidad(1); // Reset cantidad cuando se selecciona un nuevo producto
    }
  };

  const handleAgregarProducto = () => {
    if (selectedProductId) {
      const productoSeleccionado = menuItems.find(item => item.id === selectedProductId);
      if (productoSeleccionado) {
        onSelectProducto(productoSeleccionado, cantidad);
        setSelectedProductId(null); // Reset selección después de agregar
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {!busqueda && (
          <Tabs defaultValue="principal" onValueChange={(value) => setCategoriaActiva(value as MenuItem['categoria'])}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="entrada">Entradas</TabsTrigger>
              <TabsTrigger value="principal">Principales</TabsTrigger>
              <TabsTrigger value="postre">Postres</TabsTrigger>
              <TabsTrigger value="bebida">Bebidas</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto">
          {productosFiltrados.map((producto) => (
            <div 
              key={producto.id}
              className={`p-2 border rounded-md cursor-pointer transition-colors ${
                selectedProductId === producto.id ? 'bg-accent/50 border-accent' : 'hover:bg-accent/20'
              }`}
              onClick={() => handleSeleccionarProducto(producto.id)}
            >
              <div className="flex justify-between">
                <span className="font-medium">{producto.nombre}</span>
                <span className="font-semibold">${producto.precioUnitario.toFixed(2)}</span>
              </div>
              {producto.descripcion && (
                <p className="text-xs text-muted-foreground">{producto.descripcion}</p>
              )}
            </div>
          ))}
          
          {productosFiltrados.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No se encontraron productos
            </div>
          )}
        </div>
        
        {selectedProductId && (
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Select 
              value={cantidad.toString()} 
              onValueChange={(value) => setCantidad(parseInt(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Cant." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button 
              className="flex-1 bg-accent hover:bg-accent/90" 
              onClick={handleAgregarProducto}
            >
              Agregar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SelectorProductos;
