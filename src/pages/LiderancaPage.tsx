
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Church, Loader2, User, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface ConteudoLideranca {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  type: string;
}

const LiderancaPage = () => {
  // Buscar conteúdos da API
  const { data: conteudos, isLoading, error } = useQuery({
    queryKey: ['lideranca'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/lideranca');
      if (!response.ok) throw new Error('Erro ao buscar conteúdos');
      return response.json() as Promise<ConteudoLideranca[]>;
    },
  });

  // Se houver erro ao buscar conteúdos
  if (error) {
    toast.error("Erro ao carregar conteúdos");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <Church className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Ministério</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recursos para pastores e líderes: pregações, treinamentos, ferramentas ministeriais e muito mais.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-one-way-blue" />
            </div>
          ) : conteudos && conteudos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conteudos.map((conteudo) => (
                <Card key={conteudo.id} className="flex flex-col h-full">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={conteudo.imageUrl || "/placeholder.svg"} 
                      alt={conteudo.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{conteudo.type}</Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(parseISO(conteudo.date), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{conteudo.title}</h3>
                    <div className="text-sm text-gray-500 flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {conteudo.author}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 line-clamp-3">{conteudo.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Ler Mais</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-one-way-blue text-white p-8 rounded-lg text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Página em construção</h2>
              <p>Estamos preparando recursos valiosos para sua liderança. Volte em breve!</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LiderancaPage;
