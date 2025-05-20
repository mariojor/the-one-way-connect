
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Newspaper, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface Noticia {
  id: string;
  title: string;
  description: string;
  summary: string;
  imageUrl: string;
  date: string;
  author: string;
}

const NoticiasPage = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/noticias");
      if (!response.ok) throw new Error("Erro ao buscar notícias");
      
      const data = await response.json();
      setNoticias(data);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
      toast.error("Não foi possível carregar as notícias");
      // Fallback to default data if API fails
      setNoticias([
        {
          id: "1",
          title: "Conferência Nacional de Missões",
          summary: "Maior evento missionário do país reúne mais de 5 mil participantes em São Paulo.",
          description: "Maior evento missionário do país reúne mais de 5 mil participantes em São Paulo.",
          imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
          date: new Date().toISOString(),
          author: "Equipe Editorial"
        },
        {
          id: "2",
          title: "Igreja Distribui 10 Mil Bíblias",
          summary: "Projeto evangelístico alcança comunidades carentes no interior do Nordeste.",
          description: "Projeto evangelístico alcança comunidades carentes no interior do Nordeste.",
          imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
          date: new Date().toISOString(),
          author: "Maria Silva"
        },
        {
          id: "3",
          title: "Novo App de Estudo Bíblico",
          summary: "Ferramenta gratuita auxilia cristãos a aprofundarem conhecimento das escrituras.",
          description: "Ferramenta gratuita auxilia cristãos a aprofundarem conhecimento das escrituras.",
          imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
          date: new Date().toISOString(),
          author: "João Santos"
        },
        {
          id: "4",
          title: "Congresso de Jovens Reúne 20 Mil Pessoas",
          summary: "Evento teve pregações, adoração e testemunhos impactantes durante três dias.",
          description: "Evento teve pregações, adoração e testemunhos impactantes durante três dias.",
          imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
          date: new Date().toISOString(),
          author: "Paulo Oliveira"
        },
        {
          id: "5",
          title: "Nova Tradução Bíblica é Lançada",
          summary: "Versão contemporânea da Bíblia busca alcançar nova geração com linguagem acessível.",
          description: "Versão contemporânea da Bíblia busca alcançar nova geração com linguagem acessível.",
          imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65",
          date: new Date().toISOString(),
          author: "Carlos Ferreira"
        },
        {
          id: "6",
          title: "Projeto Social Transforma Comunidade",
          summary: "Igreja local implementa iniciativas que mudam realidade de bairro periférico.",
          description: "Igreja local implementa iniciativas que mudam realidade de bairro periférico.",
          imageUrl: "https://images.unsplash.com/photo-1469571486292-b53601010376",
          date: new Date().toISOString(),
          author: "Ana Costa"
        }
      ]);
    } finally {
      setLoading(false);
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
                <Newspaper className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Notícias Cristãs</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fique atualizado com as últimas notícias do mundo cristão, eventos relevantes e acontecimentos que impactam a fé e a sociedade.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-one-way-blue" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {noticias.map((noticia) => (
                <div key={noticia.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={noticia.imageUrl || "/placeholder.svg"} 
                      alt={noticia.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{formatDateSafely(noticia.date)}</div>
                    <h3 className="text-xl font-bold mb-2">{noticia.title}</h3>
                    <p className="text-gray-600 mb-4">{noticia.summary || noticia.description}</p>
                    <Link to={`/noticias/${noticia.id}`}>
                      <Button variant="outline" className="text-one-way-blue border-one-way-blue hover:bg-one-way-blue-light">
                        Ler Notícia
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NoticiasPage;
