
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const MidiaPage = () => {
  const videos = [
    {
      id: "1",
      title: "Entendendo a Graça de Deus",
      description: "Uma explicação profunda sobre o conceito da graça divina e como ela opera em nossas vidas.",
      imageUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
      duration: "25:14"
    },
    {
      id: "2",
      title: "Série: O Sermão da Montanha",
      description: "Explorando os ensinamentos de Jesus em Mateus 5-7 e sua aplicação para os dias atuais.",
      imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      duration: "42:37"
    },
    {
      id: "3",
      title: "Como Vencer a Ansiedade",
      description: "Princípios bíblicos para superar a ansiedade e encontrar a paz que excede todo o entendimento.",
      imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
      duration: "18:52"
    }
  ];

  const podcasts = [
    {
      id: "1",
      title: "Diálogos de Fé",
      description: "Conversas profundas sobre questões teológicas e desafios da fé cristã contemporânea.",
      imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
      duration: "45:21"
    },
    {
      id: "2",
      title: "Palavra Viva",
      description: "Reflexões diárias sobre a Bíblia com aplicações práticas para o cotidiano.",
      imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
      duration: "12:08"
    },
    {
      id: "3",
      title: "Cristianismo e Cultura",
      description: "Análises sobre como a fé cristã interage com diferentes aspectos da cultura contemporânea.",
      imageUrl: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32",
      duration: "36:45"
    }
  ];

  const renderMedia = (items: any[], type: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
              {item.duration}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <Button className="bg-one-way-blue hover:bg-one-way-blue/90">
              {type === 'video' ? 'Assistir Vídeo' : 'Ouvir Podcast'}
            </Button>
          </div>
        </div>
      ))}
    </div>
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
