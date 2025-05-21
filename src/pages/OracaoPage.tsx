
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Oracao {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
}

const OracaoPage = () => {
  const [pedidoOracao, setPedidoOracao] = useState("");
  const [oracoes, setOracoes] = useState<Oracao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOracoes();
  }, []);

  const fetchOracoes = async () => {
    try {
      setLoading(true);
      // Atualizado para usar o caminho do novo backend (mas mantém o fallback do mock)
      const response = await fetch("http://localhost:3001/api/oracao");
      if (!response.ok) throw new Error("Erro ao buscar orações");
      
      const data = await response.json();
      // Mapear os dados para garantir que o id seja usado corretamente (MongoDB usa _id)
      const formattedData = data.map((oracao: any) => ({
        id: oracao._id || oracao.id,
        title: oracao.title,
        author: oracao.author,
        description: oracao.description,
        content: oracao.content,
        category: oracao.category,
        date: oracao.date,
        imageUrl: oracao.imageUrl
      }));
      
      setOracoes(formattedData);
    } catch (error) {
      console.error("Erro ao carregar orações:", error);
      toast.error("Não foi possível carregar as orações");
      // Carrega dados de fallback se a API falhar
      setOracoes([
        {
          id: "1",
          title: "A Força da Oração",
          author: "Pastor João",
          description: "Sobre o poder da oração na vida cristã",
          content: "A oração é uma das ferramentas mais poderosas que temos à disposição. Através dela podemos nos comunicar diretamente com Deus, apresentando nossas petições e agradecimentos.",
          category: "Devocional",
          date: new Date().toISOString()
        },
        {
          id: "2",
          title: "Oração Perseverante",
          author: "Ministério de Intercessão",
          description: "Como perseverar em oração",
          content: "A persistência na oração demonstra nossa fé e confiança em Deus. Mesmo quando não vemos respostas imediatas, devemos continuar orando com fé.",
          category: "Ensino",
          date: new Date().toISOString()
        },
        {
          id: "3",
          title: "Oração em Grupo",
          author: "Equipe Pastoral",
          description: "O poder da oração coletiva",
          content: "Há um poder especial na oração coletiva. Quando nos unimos em um só propósito diante de Deus, Sua presença se manifesta de maneira especial.",
          category: "Comunidade",
          date: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pedidoOracao.trim()) {
      try {
        // Enviar pedido de oração para o backend
        const response = await fetch("http://localhost:3001/api/oracao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Pedido de Oração",
            author: "Anônimo",
            description: "Pedido enviado pelo site",
            content: pedidoOracao,
            category: "Pedido",
            date: new Date().toISOString()
          }),
        });

        if (response.ok) {
          toast.success("Seu pedido de oração foi enviado. Estaremos orando por você!");
          setPedidoOracao("");
          // Atualizar a lista de orações
          fetchOracoes();
        } else {
          throw new Error("Erro ao enviar o pedido de oração");
        }
      } catch (error) {
        console.error("Erro ao enviar pedido:", error);
        toast.error("Não foi possível enviar seu pedido. Por favor, tente novamente mais tarde.");
      }
    } else {
      toast.error("Por favor, escreva seu pedido de oração antes de enviar.");
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
                <Heart className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Oração</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Compartilhe seus pedidos de oração e seja fortalecido com nossas devocionais diárias sobre o poder da oração.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Pedidos de Oração</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4">
                  Compartilhe seu pedido de oração conosco. Nossa equipe de intercessores estará orando por você e suas necessidades.
                </p>
                <form onSubmit={handleSubmit}>
                  <Textarea 
                    placeholder="Escreva seu pedido de oração aqui..." 
                    className="mb-4" 
                    rows={6}
                    value={pedidoOracao}
                    onChange={(e) => setPedidoOracao(e.target.value)}
                  />
                  <Button type="submit" className="w-full flex items-center justify-center gap-2">
                    Enviar Pedido <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Devocionais sobre Oração</h2>
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-one-way-blue" />
                </div>
              ) : oracoes.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-md">
                  <p className="text-gray-500">Nenhuma devocional disponível no momento.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {oracoes.map((oracao) => (
                    <div key={oracao.id} className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">{oracao.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{oracao.author}</p>
                      <p className="text-one-way-blue font-medium mb-3">{oracao.description}</p>
                      <p className="text-gray-600">{oracao.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OracaoPage;
