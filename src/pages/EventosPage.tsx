
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ExternalLink, Loader2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface Evento {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  registerLink: string;
}

const EventosPage = () => {
  // Buscar eventos da API
  const { data: eventos, isLoading, error } = useQuery({
    queryKey: ['eventos'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/eventos');
      if (!response.ok) throw new Error('Erro ao buscar eventos');
      return response.json() as Promise<Evento[]>;
    },
  });

  // Se houver erro ao buscar eventos
  if (error) {
    toast.error("Erro ao carregar eventos");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <Calendar className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Eventos</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fique por dentro dos principais eventos cristãos: conferências, cultos especiais, congressos e muito mais.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-one-way-blue" />
            </div>
          ) : eventos && eventos.length > 0 ? (
            <div className="space-y-6">
              {eventos.map((evento) => (
                <Card key={evento.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="hidden md:block h-full">
                      <img 
                        src={evento.imageUrl || "/placeholder.svg"} 
                        alt={evento.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="col-span-2 flex flex-col">
                      <CardHeader>
                        <h3 className="text-2xl font-bold">{evento.title}</h3>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            {format(parseISO(evento.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            {evento.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            {evento.location}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-600">{evento.description}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button asChild className="w-full sm:w-auto flex items-center gap-2">
                          <a href={evento.registerLink} target="_blank" rel="noopener noreferrer">
                            Inscrever-se <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-one-way-blue text-white p-8 rounded-lg text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Sem eventos disponíveis</h2>
              <p>Em breve você poderá encontrar aqui uma agenda completa de eventos cristãos!</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventosPage;
