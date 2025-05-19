
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, 
  FileText, 
  Calendar, 
  LogOut,
  BookOpen,
  PlusCircle,
  Heart,
  Video,
  Newspaper,
  Music,
  Users,
  Flag,
  Church
} from "lucide-react";
import { toast } from "sonner";
import AdminDevocionalManager from "@/components/admin/AdminDevocionalManager";
import AdminArtigoManager from "@/components/admin/AdminArtigoManager";
import AdminEventoManager from "@/components/admin/AdminEventoManager";
import AdminOracaoManager from "@/components/admin/AdminOracaoManager";
import AdminMidiaManager from "@/components/admin/AdminMidiaManager";
import AdminNoticiaManager from "@/components/admin/AdminNoticiaManager";
import AdminEstudoManager from "@/components/admin/AdminEstudoManager";
import AdminLouvorManager from "@/components/admin/AdminLouvorManager";
import AdminFamiliaManager from "@/components/admin/AdminFamiliaManager";
import AdminMissoesManager from "@/components/admin/AdminMissoesManager";
import AdminJuventudeManager from "@/components/admin/AdminJuventudeManager";
import AdminLiderancaManager from "@/components/admin/AdminLiderancaManager";
import AdminComunidadeManager from "@/components/admin/AdminComunidadeManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("devocionais");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificação simples de autenticação (mock)
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    
    setIsAuthorized(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logout realizado com sucesso");
    navigate("/admin/login");
  };

  if (!isAuthorized) {
    return null; // Evita renderização enquanto verifica autenticação
  }
  
  const userName = JSON.parse(localStorage.getItem("adminUser") || '{}').name || "Administrador";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-one-way-blue" />
            <div>
              <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
              <p className="text-gray-500 text-sm">Bem-vindo(a), {userName}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container-custom py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="overflow-x-auto pb-2">
            <TabsList className="grid grid-flow-col auto-cols-max gap-2 w-max">
              <TabsTrigger value="devocionais" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Devocionais
              </TabsTrigger>
              <TabsTrigger value="artigos" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Artigos
              </TabsTrigger>
              <TabsTrigger value="eventos" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Eventos
              </TabsTrigger>
              <TabsTrigger value="oracao" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Oração
              </TabsTrigger>
              <TabsTrigger value="midia" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Mídia
              </TabsTrigger>
              <TabsTrigger value="noticias" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                Notícias
              </TabsTrigger>
              <TabsTrigger value="estudos" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Estudos
              </TabsTrigger>
              <TabsTrigger value="louvor" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Louvor
              </TabsTrigger>
              <TabsTrigger value="familia" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Família
              </TabsTrigger>
              <TabsTrigger value="missoes" className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                Missões
              </TabsTrigger>
              <TabsTrigger value="juventude" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Juventude
              </TabsTrigger>
              <TabsTrigger value="lideranca" className="flex items-center gap-2">
                <Church className="h-4 w-4" />
                Ministério
              </TabsTrigger>
              <TabsTrigger value="comunidade" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Comunidade
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="devocionais">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Devocionais</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/devocionais/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Devocional
                  </Link>
                </Button>
              </div>
              <AdminDevocionalManager />
            </div>
          </TabsContent>
          
          <TabsContent value="artigos">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Artigos</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/artigos/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Artigo
                  </Link>
                </Button>
              </div>
              <AdminArtigoManager />
            </div>
          </TabsContent>
          
          <TabsContent value="eventos">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Eventos</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/eventos/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Evento
                  </Link>
                </Button>
              </div>
              <AdminEventoManager />
            </div>
          </TabsContent>

          <TabsContent value="oracao">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Oração</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/oracao/novo">
                    <PlusCircle className="h-4 w-4" />
                    Nova Oração
                  </Link>
                </Button>
              </div>
              <AdminOracaoManager />
            </div>
          </TabsContent>
          
          <TabsContent value="midia">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Mídia</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/midia/novo">
                    <PlusCircle className="h-4 w-4" />
                    Nova Mídia
                  </Link>
                </Button>
              </div>
              <AdminMidiaManager />
            </div>
          </TabsContent>
          
          <TabsContent value="noticias">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Notícias</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/noticias/novo">
                    <PlusCircle className="h-4 w-4" />
                    Nova Notícia
                  </Link>
                </Button>
              </div>
              <AdminNoticiaManager />
            </div>
          </TabsContent>
          
          <TabsContent value="estudos">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Estudos</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/estudos/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Estudo
                  </Link>
                </Button>
              </div>
              <AdminEstudoManager />
            </div>
          </TabsContent>
          
          <TabsContent value="louvor">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Louvor</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/louvor/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Louvor
                  </Link>
                </Button>
              </div>
              <AdminLouvorManager />
            </div>
          </TabsContent>
          
          <TabsContent value="familia">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Família</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/familia/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Conteúdo
                  </Link>
                </Button>
              </div>
              <AdminFamiliaManager />
            </div>
          </TabsContent>
          
          <TabsContent value="missoes">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Missões</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/missoes/novo">
                    <PlusCircle className="h-4 w-4" />
                    Nova Missão
                  </Link>
                </Button>
              </div>
              <AdminMissoesManager />
            </div>
          </TabsContent>
          
          <TabsContent value="juventude">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Juventude</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/juventude/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Conteúdo
                  </Link>
                </Button>
              </div>
              <AdminJuventudeManager />
            </div>
          </TabsContent>
          
          <TabsContent value="lideranca">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Ministério</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/lideranca/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Conteúdo
                  </Link>
                </Button>
              </div>
              <AdminLiderancaManager />
            </div>
          </TabsContent>
          
          <TabsContent value="comunidade">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gerenciar Comunidade</h2>
                <Button 
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link to="/admin/comunidade/novo">
                    <PlusCircle className="h-4 w-4" />
                    Novo Conteúdo
                  </Link>
                </Button>
              </div>
              <AdminComunidadeManager />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
