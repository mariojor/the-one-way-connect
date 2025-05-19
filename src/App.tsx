
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
import DevocionalPage from "./pages/DevocionalPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddDevocionalPage from "./pages/admin/AddDevocionalPage";
import AddArtigoPage from "./pages/admin/AddArtigoPage";
import AddEventoPage from "./pages/admin/AddEventoPage";

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
          <Route path="/devocional" element={<DevocionalPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/devocionais/novo" element={<AddDevocionalPage />} />
          <Route path="/admin/devocionais/editar/:id" element={<AddDevocionalPage />} />
          <Route path="/admin/artigos/novo" element={<AddArtigoPage />} />
          <Route path="/admin/artigos/editar/:id" element={<AddArtigoPage />} />
          <Route path="/admin/eventos/novo" element={<AddEventoPage />} />
          <Route path="/admin/eventos/editar/:id" element={<AddEventoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
