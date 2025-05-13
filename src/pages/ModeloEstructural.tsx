
import React from 'react';
import MultilistaVisual from '@/components/MultilistaVisual';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModeloEstructural: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Modelo Estructural de Datos</h1>
      </div>

      <Tabs defaultValue="visualizacion">
        <TabsList>
          <TabsTrigger value="visualizacion">Visualización</TabsTrigger>
          <TabsTrigger value="explicacion">Explicación</TabsTrigger>
        </TabsList>

        <TabsContent value="visualizacion" className="mt-4">
          <MultilistaVisual />
        </TabsContent>

        <TabsContent value="explicacion" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Concepto de Multilistas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Una <strong>multilista</strong> es una estructura de datos que consiste en múltiples listas enlazadas 
                interconectadas. En este sistema, se implementa mediante dos tipos de nodos:
              </p>

              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-bold mb-2">NodoOrden</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Contiene datos básicos: id, mesa, cliente, fecha, estado</li>
                  <li><strong>siguiente:</strong> Puntero horizontal que apunta al siguiente NodoOrden</li>
                  <li><strong>primerProducto:</strong> Puntero vertical que apunta al primer NodoProducto de esta orden</li>
                </ul>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-bold mb-2">NodoProducto</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Contiene datos: id, nombre, cantidad, precioUnitario</li>
                  <li><strong>siguiente:</strong> Puntero horizontal que apunta al siguiente NodoProducto en la misma orden</li>
                </ul>
              </div>

              <h3 className="font-bold mt-4">Estructura de la Multilista:</h3>

              <div className="space-y-2">
                <p>
                  La multilista comienza con un puntero <code>primeraOrden</code> que apunta al primer NodoOrden.
                  Cada NodoOrden tiene un puntero <code>siguiente</code> que forma una lista horizontal de órdenes.
                </p>

                <p>
                  A su vez, cada NodoOrden tiene un puntero <code>primerProducto</code> que apunta a una lista vertical de productos.
                  Los productos de cada orden están enlazados horizontalmente mediante el puntero <code>siguiente</code>.
                </p>

                <p className="mt-4">
                  Esta estructura permite navegar fácilmente tanto entre órdenes como entre los productos de cada orden,
                  manteniendo la relación jerárquica entre ellos sin duplicar información.
                </p>
              </div>

              <div className="p-4 border border-accent rounded-md mt-6">
                <h3 className="font-bold mb-2">Operaciones principales:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Agregar una nueva orden a la multilista</li>
                  <li>Eliminar una orden existente</li>
                  <li>Buscar una orden por su ID</li>
                  <li>Agregar un producto a una orden específica</li>
                  <li>Eliminar un producto de una orden</li>
                  <li>Calcular el total de una orden sumando sus productos</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModeloEstructural;
