
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BookOpenText, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Interface para tipagem dos devocionais
interface Devocional {
  id: string;
  date?: string;
  data?: string;
  title?: string;
  titulo?: string;
  verse?: string;
  versiculo?: string;
  verseText?: string;
  content?: string;
  prayer?: string;
  application?: string;
  authorId?: string;
  autor?: string;
}

// Interface para um devocional normalizado
interface NormalizedDevocional {
  id: string;
  safeDate: string;
  safeTitle: string;
  safeVerse: string;
  verseText?: string;
  content?: string;
  prayer?: string;
  application?: string;
}

const DevocionalPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  
  // Buscar devocionais da API
  const { data: devocionais, isLoading, error } = useQuery({
    queryKey: ['devocionais'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/devocionais');
      if (!response.ok) throw new Error('Erro ao buscar devocionais');
      return response.json() as Promise<Devocional[]>;
    },
  });

  // Função para normalizar os dados dos devocionais
  const normalizeDevocional = (devocional: Devocional): NormalizedDevocional => {
    return {
      id: devocional.id,
      safeDate: devocional.date || devocional.data || "",
      safeTitle: devocional.title || devocional.titulo || "Devocional sem título",
      safeVerse: devocional.verse || devocional.versiculo || "",
      verseText: devocional.verseText || "",
      content: devocional.content || "",
      prayer: devocional.prayer || "",
      application: devocional.application || ""
    };
  };

  // Normalizar todos os devocionais
  const normalizedDevocionais = devocionais ? devocionais.map(normalizeDevocional) : [];

  // Encontrar devocional para a data selecionada ou o mais próximo
  const findDevocionalByDate = (date: Date): NormalizedDevocional | undefined => {
    if (!normalizedDevocionais.length) return undefined;

    const dateString = format(date, 'yyyy-MM-dd');
    
    // Tentar encontrar exatamente para a data selecionada
    const exactMatch = normalizedDevocionais.find(d => d.safeDate === dateString);
    if (exactMatch) return exactMatch;
    
    // Se não encontrar, retorna o primeiro como fallback
    return normalizedDevocionais[0];
  };
  
  const currentDevotional = findDevocionalByDate(selectedDate);
  
  // Navegação pelos devocionais
  const goToPreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
  };
  
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  // Se houver erro ao buscar devocionais
  if (error) {
    toast.error("Erro ao carregar devocionais");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <BookOpenText className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Devocional Diário</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meditações diárias para fortalecer sua caminhada com Deus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar with calendar */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Calendário
                  </h2>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border shadow"
                    locale={ptBR}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousDay}
                      className="flex items-center"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(today)}
                      className="flex items-center"
                    >
                      Hoje
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextDay}
                      className="flex items-center"
                    >
                      Próximo
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main devotional content */}
            <div className="md:col-span-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-one-way-blue" />
                </div>
              ) : currentDevotional ? (
                <Card className="overflow-hidden">
                  <div className="bg-one-way-blue text-white p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">{currentDevotional.safeTitle}</h2>
                      <div className="text-right">
                        <div className="text-sm opacity-90">
                          {currentDevotional.safeDate ? 
                            format(parseISO(currentDevotional.safeDate), "dd 'de' MMMM, yyyy", { locale: ptBR }) : 
                            "Data não disponível"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    {currentDevotional.safeVerse && (
                      <div className="bg-blue-50 border-l-4 border-one-way-blue p-4 mb-6">
                        <h3 className="font-bold mb-2">{currentDevotional.safeVerse}</h3>
                        {currentDevotional.verseText && (
                          <p className="italic">"{currentDevotional.verseText}"</p>
                        )}
                      </div>
                    )}

                    {currentDevotional.content && (
                      <div className="prose max-w-none">
                        {currentDevotional.content.split("\n\n").map((paragraph, i) => (
                          <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    )}

                    {currentDevotional.prayer && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold mb-3">Oração</h3>
                        <div className="bg-gray-50 p-4 rounded-md italic">
                          {currentDevotional.prayer}
                        </div>
                      </div>
                    )}

                    {currentDevotional.application && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold mb-3">Aplicação Prática</h3>
                        <div className="border border-gray-200 p-4 rounded-md">
                          {currentDevotional.application}
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex justify-between">
                      <Button variant="outline" onClick={goToPreviousDay} className="flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Devocional Anterior
                      </Button>
                      <Button variant="outline" onClick={goToNextDay} className="flex items-center">
                        Próximo Devocional
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="overflow-hidden">
                  <div className="p-8 text-center">
                    <h2 className="text-xl font-semibold mb-4">Nenhum devocional encontrado</h2>
                    <p className="text-gray-500 mb-4">Não há devocional disponível para esta data.</p>
                    <Button onClick={() => setSelectedDate(today)}>Voltar para Hoje</Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DevocionalPage;
