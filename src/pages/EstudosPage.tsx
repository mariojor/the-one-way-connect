
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EstudosPage = () => {
  const estudos = [
    {
      id: "1",
      title: "O Caminho da Salvação",
      description: "Um estudo profundo sobre o plano de Deus para redenção da humanidade através de Jesus Cristo.",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    },
    {
      id: "2",
      title: "Frutos do Espírito",
      description: "Explorando as características que o Espírito Santo desenvolve na vida do cristão comprometido.",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    },
    {
      id: "3",
      title: "Armadura de Deus",
      description: "Como podemos nos proteger das armadilhas espirituais usando a armadura que Deus nos fornece.",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      id: "4",
      title: "As Parábolas de Jesus",
      description: "Descobrindo as ricas lições escondidas nas histórias que Jesus contou.",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      id: "5",
      title: "Os Salmos e a Adoração",
      description: "Mergulhando nas escrituras poéticas que nos ensinam a adorar a Deus em todas as circunstâncias.",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
    {
      id: "6",
      title: "Epístolas Paulinas",
      description: "Compreendendo as cartas de Paulo e sua relevância para a igreja contemporânea.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <Book className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Estudos Bíblicos</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aprofunde seu conhecimento da Palavra de Deus com nossos estudos bíblicos, cuidadosamente preparados para auxiliar em sua jornada espiritual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {estudos.map((estudo) => (
              <div key={estudo.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={estudo.imageUrl} 
                    alt={estudo.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{estudo.title}</h3>
                  <p className="text-gray-600 mb-4">{estudo.description}</p>
                  <Link to={`/estudos/${estudo.id}`}>
                    <Button variant="outline" className="text-one-way-blue border-one-way-blue hover:bg-one-way-blue-light">
                      Ler Estudo
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EstudosPage;
