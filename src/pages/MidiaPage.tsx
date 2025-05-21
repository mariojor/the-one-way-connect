
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Video, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Midia {
  id: string;
  title: string;
  description: string;
  author: string;
  type: "video" | "podcast" | "outro";
  url: string;
  imageUrl: string;
  duration: string;
  date: string;
}

const MidiaPage = () => {
  const [midias, setMidias] = useState<Midia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMidias();
  }, []);

  const fetchMidias = async () => {
    try {
      setLoading(true);
      // Atualizado para usar o caminho do novo backend (mas mantém o fallback do mock)
      const response = await fetch("http://localhost:3001/api/midia");
      if (!response.ok) throw new Error("Erro ao buscar mídias");
      
      const data = await response.json();
      // Mapear os dados para garantir que o id seja usado corretamente (MongoDB usa _id)
      const formattedData = data.map((midia: any) => ({
        id: midia._id || midia.id,
        title: midia.title,
        description: midia.description,
        author: midia.author,
        type: midia.type,
        url: midia.url,
        imageUrl: midia.imageUrl,
        duration: midia.duration,
        date: midia.date
      }));
      
      setMidias(formattedData);
    } catch (error) {
      console.error("Erro ao carregar mídias:", error);
      toast.error("Não foi possível carregar as mídias");
      // Carrega dados de fallback se a API falhar
      setMidias([
        {
          id: "1",
          title: "Entendendo a Graça de Deus",
          description: "Uma explicação profunda sobre o conceito da graça divina e como ela opera em nossas vidas.",
          author: "Pr. Carlos Oliveira",
          type: "video",
          url: "https://exemplo.com/videos/graca",
          imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
          duration: "25:14",
          date: new Date().toISOString()
        },
        {
          id: "2",
          title: "Série: O Sermão da Montanha",
          description: "Explorando os ensinamentos de Jesus em Mateus 5-7 e sua aplicação para os dias atuais.",
          author: "Dra. Ana Silva",
          type: "video",
          url: "https://exemplo.com/videos/sermao-montanha",
          imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
          duration: "42:37",
          date: new Date().toISOString()
        },
        {
          id: "3",
          title: "Diálogos de Fé",
          description: "Conversas profundas sobre questões teológicas e desafios da fé cristã contemporânea.",
          author: "Dr. Paulo Santos",
          type: "podcast",
          url: "https://exemplo.com/podcast/dialogos",
          imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
          duration: "45:21",
          date: new Date().toISOString()
        },
        {
          id: "4",
          title: "Palavra Viva",
          description: "Reflexões diárias sobre a Bíblia com aplicações práticas para o cotidiano.",
          author: "Ministério de Ensino",
          type: "podcast",
          url: "https://exemplo.com/podcast/palavra",
          imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
          duration: "12:08",
          date: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const videos = midias.filter(midia => midia.type === 'video');
  const podcasts = midias.filter(midia => midia.type === 'podcast');

  const renderMedia = (items: Midia[], type: string) => (
    loading ? (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-one-way-blue" />
      </div>
    ) : items.length === 0 ? (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum conteúdo {type === 'video' ? 'de vídeo' : 'de podcast'} disponível no momento.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.imageUrl || "/placeholder.svg"} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                {item.duration}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2">por {item.author}</p>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <Button className="bg-one-way-blue hover:bg-one-way-blue/90" asChild>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {type === 'video' ? 'Assistir Vídeo' : 'Ouvir Podcast'}
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <Video className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Vídeos & Podcasts</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conteúdo em áudio e vídeo para edificação espiritual. Pregações, estudos bíblicos, debates e muito mais.
            </p>
          </div>

          <Tabs defaultValue="videos" className="mt-8">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="videos" className="px-8">Vídeos</TabsTrigger>
                <TabsTrigger value="podcasts" className="px-8">Podcasts</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="videos">
              {renderMedia(videos, 'video')}
            </TabsContent>
            
            <TabsContent value="podcasts">
              {renderMedia(podcasts, 'podcast')}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MidiaPage;
