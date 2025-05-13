
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        // Store auth state in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al sistema de gestión de restaurante"
        });
        navigate('/');
      } else {
        toast({
          title: "Error de autenticación",
          description: "Usuario o contraseña incorrectos",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))', 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Logo en el fondo con efecto de opacidad */}
      <div 
        className="absolute inset-0 z-0 opacity-15" 
        style={{ 
          backgroundImage: 'url("/lovable-uploads/939ee94a-50f7-4b8f-b4f3-c00aabfe39e1.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          filter: 'blur(1px)'
        }}
      ></div>
      
      <div className="w-full max-w-md px-4 animate-fade-in z-10">
        <Card className="border-2 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <img 
                src="/lovable-uploads/939ee94a-50f7-4b8f-b4f3-c00aabfe39e1.png" 
                alt="RESTAURANTE EL SAYAN Logo" 
                className="h-16 w-auto"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">RESTAURANTE EL SAYAN</CardTitle>
            <CardDescription className="text-lg">Sistema de Gestión de Pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input 
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingrese su usuario"
                  required
                  className="transition-all duration-200 focus:ring-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  required
                  className="transition-all duration-200 focus:ring-accent"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p className="w-full">Usuario: admin | Contraseña: admin</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
