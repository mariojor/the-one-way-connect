
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface Artigo {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

const ArtigosPage = () => {
  // Buscar artigos da API
  const { data: artigos, isLoading, error } = useQuery({
    queryKey: ['artigos'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/artigos');
      if (!response.ok) throw new Error('Erro ao buscar artigos');
      return response.json() as Promise<Artigo[]>;
    },
  });

  // Se houver erro ao buscar artigos
  if (error) {
    toast.error("Erro ao carregar artigos");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <FileText className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Artigos</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reflexões e colunas de opinião cristã sobre temas relevantes para a vida de fé.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-one-way-blue" />
            </div>
          ) : artigos && artigos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artigos.map((artigo) => (
                <Card key={artigo.id} className="flex flex-col h-full overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={artigo.imageUrl || "/placeholder.svg"} 
                      alt={artigo.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(parseISO(artigo.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2">{artigo.title}</h3>
                    <p className="text-sm text-gray-500">Por {artigo.author}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 line-clamp-3">{artigo.summary}</p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
                    {artigo.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-one-way-blue text-white p-8 rounded-lg text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Sem artigos disponíveis</h2>
              <p>Em breve teremos artigos inspiradores e reflexões profundas sobre a vida cristã!</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArtigosPage;
