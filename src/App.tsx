
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EstudosPage from "./pages/EstudosPage";
import NoticiasPage from "./pages/NoticiasPage";
import MidiaPage from "./pages/MidiaPage";
import OracaoPage from "./pages/OracaoPage";
import LouvorPage from "./pages/LouvorPage";
import FamiliaPage from "./pages/FamiliaPage";
import JuventudePage from "./pages/JuventudePage";
import LiderancaPage from "./pages/LiderancaPage";
import MissoesPage from "./pages/MissoesPage";
import EventosPage from "./pages/EventosPage";
import ArtigosPage from "./pages/ArtigosPage";
import ComunidadePage from "./pages/ComunidadePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/estudos" element={<EstudosPage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/midia" element={<MidiaPage />} />
          <Route path="/oracao" element={<OracaoPage />} />
          <Route path="/louvor" element={<LouvorPage />} />
          <Route path="/familia" element={<FamiliaPage />} />
          <Route path="/juventude" element={<JuventudePage />} />
          <Route path="/lideranca" element={<LiderancaPage />} />
          <Route path="/missoes" element={<MissoesPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/artigos" element={<ArtigosPage />} />
          <Route path="/comunidade" element={<ComunidadePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
