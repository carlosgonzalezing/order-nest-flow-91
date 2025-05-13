
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrdenes } from '@/context/OrdenesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

const NuevaOrden: React.FC = () => {
  const navigate = useNavigate();
  const { agregarOrden } = useOrdenes();
  
  const [nuevaOrden, setNuevaOrden] = useState({
    mesa: 1,
    cliente: '',
    estado: 'pendiente' as const
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaOrden({
      ...nuevaOrden,
      [name]: name === 'mesa' ? parseInt(value) || '' : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orden = agregarOrden(nuevaOrden);
    navigate(`/orden/${orden.id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        <h1 className="text-3xl font-bold">Nueva Orden</h1>
      </div>
      
      <div className="max-w-md mx-auto">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Información de la orden</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Número de Mesa
                </label>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  name="mesa"
                  value={nuevaOrden.mesa}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">
                  Nombre del Cliente
                </label>
                <Input
                  placeholder="Juan Pérez"
                  name="cliente"
                  value={nuevaOrden.cliente}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-accent/90"
                disabled={!nuevaOrden.cliente || !nuevaOrden.mesa}
              >
                Crear orden
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NuevaOrden;
