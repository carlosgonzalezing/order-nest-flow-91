
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OrdenesProvider } from "@/context/OrdenesContext";
import Layout from "./components/Layout";
import OrdenesActivas from "./pages/OrdenesActivas";
import NuevaOrden from "./pages/NuevaOrden";
import DetalleOrden from "./pages/DetalleOrden";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OrdenesProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OrdenesActivas />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/nueva-orden"
              element={
                <ProtectedRoute>
                  <Layout>
                    <NuevaOrden />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orden/:ordenId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DetalleOrden />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OrdenesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
