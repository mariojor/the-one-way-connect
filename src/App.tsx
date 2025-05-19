
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
import AddOracaoPage from "./pages/admin/AddOracaoPage";
import AddMidiaPage from "./pages/admin/AddMidiaPage";
import AddNoticiaPage from "./pages/admin/AddNoticiaPage";
import AddEstudoPage from "./pages/admin/AddEstudoPage";
import AddLouvorPage from "./pages/admin/AddLouvorPage";
import AddFamiliaPage from "./pages/admin/AddFamiliaPage";
import AddMissoesPage from "./pages/admin/AddMissoesPage";
import AddJuventudePage from "./pages/admin/AddJuventudePage";
import AddLiderancaPage from "./pages/admin/AddLiderancaPage";
import AddComunidadePage from "./pages/admin/AddComunidadePage";

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

          {/* Rotas para devocionais */}
          <Route path="/admin/devocionais/novo" element={<AddDevocionalPage />} />
          <Route path="/admin/devocionais/editar/:id" element={<AddDevocionalPage />} />

          {/* Rotas para artigos */}
          <Route path="/admin/artigos/novo" element={<AddArtigoPage />} />
          <Route path="/admin/artigos/editar/:id" element={<AddArtigoPage />} />

          {/* Rotas para eventos */}
          <Route path="/admin/eventos/novo" element={<AddEventoPage />} />
          <Route path="/admin/eventos/editar/:id" element={<AddEventoPage />} />

          {/* Novas rotas para oração */}
          <Route path="/admin/oracao/novo" element={<AddOracaoPage />} />
          <Route path="/admin/oracao/editar/:id" element={<AddOracaoPage />} />

          {/* Novas rotas para mídia */}
          <Route path="/admin/midia/novo" element={<AddMidiaPage />} />
          <Route path="/admin/midia/editar/:id" element={<AddMidiaPage />} />

          {/* Novas rotas para notícias */}
          <Route path="/admin/noticias/novo" element={<AddNoticiaPage />} />
          <Route path="/admin/noticias/editar/:id" element={<AddNoticiaPage />} />

          {/* Novas rotas para estudos */}
          <Route path="/admin/estudos/novo" element={<AddEstudoPage />} />
          <Route path="/admin/estudos/editar/:id" element={<AddEstudoPage />} />

          {/* Novas rotas para louvor */}
          <Route path="/admin/louvor/novo" element={<AddLouvorPage />} />
          <Route path="/admin/louvor/editar/:id" element={<AddLouvorPage />} />

          {/* Novas rotas para família */}
          <Route path="/admin/familia/novo" element={<AddFamiliaPage />} />
          <Route path="/admin/familia/editar/:id" element={<AddFamiliaPage />} />

          {/* Novas rotas para missões */}
          <Route path="/admin/missoes/novo" element={<AddMissoesPage />} />
          <Route path="/admin/missoes/editar/:id" element={<AddMissoesPage />} />

          {/* Novas rotas para juventude */}
          <Route path="/admin/juventude/novo" element={<AddJuventudePage />} />
          <Route path="/admin/juventude/editar/:id" element={<AddJuventudePage />} />

          {/* Novas rotas para liderança/ministério */}
          <Route path="/admin/lideranca/novo" element={<AddLiderancaPage />} />
          <Route path="/admin/lideranca/editar/:id" element={<AddLiderancaPage />} />

          {/* Novas rotas para comunidade */}
          <Route path="/admin/comunidade/novo" element={<AddComunidadePage />} />
          <Route path="/admin/comunidade/editar/:id" element={<AddComunidadePage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
