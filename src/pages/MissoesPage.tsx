
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Flag, Loader2, MapPin, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface Missao {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  location: string;
  missionary: string;
  status: "ativo" | "concluido" | "planejado";
  date: string;
}

const MissoesPage = () => {
  // Buscar missões da API
  const { data: missoes, isLoading, error } = useQuery({
    queryKey: ['missoes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/missoes');
      if (!response.ok) throw new Error('Erro ao buscar missões');
      return response.json() as Promise<Missao[]>;
    },
  });

  // Mostrar erro se houver algum problema ao buscar missões
  if (error) {
    toast.error("Erro ao carregar missões");
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ativo": return "default";
      case "concluido": return "secondary";
      case "planejado": return "outline";
      default: return "default";
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "ativo": return "Ativo";
      case "concluido": return "Concluído";
      case "planejado": return "Planejado";
      default: return status;
    }
  };

  // Função para formatar a data com segurança
  const formatDateSafely = (dateString: string | undefined) => {
    if (!dateString) return "Data não disponível";
    
    try {
      return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (err) {
      console.error("Erro ao formatar data:", dateString, err);
      return "Data inválida";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <Flag className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Missões</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Relatórios e campanhas evangelísticas: como a Palavra de Deus está alcançando os confins da terra.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-one-way-blue" />
            </div>
          ) : missoes && missoes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missoes.map((missao) => (
                <Card key={missao.id} className="overflow-hidden">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={missao.imageUrl || "/placeholder.svg"} 
                      alt={missao.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge 
                      variant={getStatusVariant(missao.status)} 
                      className="absolute top-2 right-2"
                    >
                      {getStatusText(missao.status)}
                    </Badge>
                  </div>
                  <CardHeader>
                    <h3 className="text-xl font-bold">{missao.title}</h3>
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {missao.location}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {missao.missionary}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDateSafely(missao.date)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{missao.description}</p>
                    <Button className="w-full">Ver Detalhes</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-one-way-blue text-white p-8 rounded-lg text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Página em construção</h2>
              <p>Estamos preparando conteúdo inspirador sobre a obra missionária. Volte em breve!</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MissoesPage;
