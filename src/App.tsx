
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrdenesProvider } from "@/context/OrdenesContext";
import Layout from "./components/Layout";
import OrdenesActivas from "./pages/OrdenesActivas";
import NuevaOrden from "./pages/NuevaOrden";
import DetalleOrden from "./pages/DetalleOrden";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <OrdenesProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<OrdenesActivas />} />
              <Route path="/nueva-orden" element={<NuevaOrden />} />
              <Route path="/orden/:ordenId" element={<DetalleOrden />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </OrdenesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
