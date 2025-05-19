
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
  PlusCircle
} from "lucide-react";
import { toast } from "sonner";
import AdminDevocionalManager from "@/components/admin/AdminDevocionalManager";
import AdminArtigoManager from "@/components/admin/AdminArtigoManager";
import AdminEventoManager from "@/components/admin/AdminEventoManager";

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
          <TabsList className="grid grid-cols-3 w-full md:w-[600px]">
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
          </TabsList>
          
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
