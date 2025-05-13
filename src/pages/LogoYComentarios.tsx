
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Star, ChefHat } from "lucide-react";

interface Comentario {
  id: string;
  nombre: string;
  texto: string;
  calificacion: number;
  fecha: Date;
}

const LogoYComentarios: React.FC = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([
    {
      id: '1',
      nombre: 'María García',
      texto: '¡La comida es deliciosa! Especialmente recomiendo el ceviche.',
      calificacion: 5,
      fecha: new Date('2024-04-10')
    },
    {
      id: '2',
      nombre: 'Juan Pérez',
      texto: 'El ambiente es muy acogedor y el servicio excelente.',
      calificacion: 4,
      fecha: new Date('2024-04-15')
    },
    {
      id: '3',
      nombre: 'Ana Rodríguez',
      texto: 'Muy buena experiencia, volveré pronto con mi familia.',
      calificacion: 5,
      fecha: new Date('2024-04-20')
    }
  ]);

  const [nuevoComentario, setNuevoComentario] = useState({
    nombre: '',
    texto: '',
    calificacion: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nuevoComentario.nombre.trim() || !nuevoComentario.texto.trim()) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    const comentario: Comentario = {
      id: Date.now().toString(),
      nombre: nuevoComentario.nombre,
      texto: nuevoComentario.texto,
      calificacion: nuevoComentario.calificacion,
      fecha: new Date()
    };
    
    setComentarios([comentario, ...comentarios]);
    setNuevoComentario({
      nombre: '',
      texto: '',
      calificacion: 5
    });
    
    toast({
      title: "¡Gracias por su comentario!",
      description: "Su opinión es importante para nosotros."
    });
  };
  
  const renderEstrellas = (calificacion: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${
          index < calificacion 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-gray-300"
        }`} 
      />
    ));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Nuestro Restaurante</h1>
        <div className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-accent" />
          <span className="font-bold">RESTAURANTE EL SAYAN</span>
        </div>
      </div>
      
      {/* Sección del Logo */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary/5 text-center">
          <CardTitle className="text-2xl">Nuestro Logo</CardTitle>
        </CardHeader>
        <CardContent className="p-8 flex flex-col items-center">
          <div className="relative mb-8 overflow-hidden rounded-xl border-4 border-primary p-4 shadow-xl w-64 h-64 flex items-center justify-center bg-white">
            <img 
              src="/lovable-uploads/939ee94a-50f7-4b8f-b4f3-c00aabfe39e1.png" 
              alt="RESTAURANTE EL SAYAN Logo" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-2">RESTAURANTE EL SAYAN</h3>
            <p className="text-muted-foreground">
              Nuestro logo representa la tradición y calidad que ofrecemos en cada platillo. 
              Desde nuestra fundación, nos hemos comprometido a brindar la mejor experiencia 
              gastronómica a nuestros clientes.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Sección de Comentarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="bg-accent/5">
              <CardTitle className="text-2xl">Comentarios de Nuestros Clientes</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {comentarios.length > 0 ? (
                comentarios.map((comentario) => (
                  <div key={comentario.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{comentario.nombre}</h3>
                      <span className="text-xs text-muted-foreground">
                        {comentario.fecha.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex my-1">
                      {renderEstrellas(comentario.calificacion)}
                    </div>
                    <p className="text-muted-foreground mt-1">{comentario.texto}</p>
                  </div>
                ))
              ) : (
                <p className="py-4 text-center text-muted-foreground">
                  No hay comentarios aún. ¡Sé el primero en comentar!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Deja tu Comentario</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    placeholder="Ingrese su nombre"
                    value={nuevoComentario.nombre}
                    onChange={(e) => setNuevoComentario({...nuevoComentario, nombre: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="calificacion">Calificación</Label>
                  <div className="flex gap-1">
                    {Array(5).fill(0).map((_, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setNuevoComentario({...nuevoComentario, calificacion: index + 1})}
                        className="p-0 h-8 w-8"
                      >
                        <Star 
                          className={`h-6 w-6 ${
                            index < nuevoComentario.calificacion 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`} 
                        />
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comentario">Comentario</Label>
                  <Textarea
                    id="comentario"
                    placeholder="Cuéntanos tu experiencia"
                    value={nuevoComentario.texto}
                    onChange={(e) => setNuevoComentario({...nuevoComentario, texto: e.target.value})}
                    required
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Enviar Comentario
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogoYComentarios;
