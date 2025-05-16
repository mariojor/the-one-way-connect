
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BookOpenText, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

// Sample devotional data - in a real application, this would come from a database or API
const devotionals = [
  {
    id: "1",
    date: new Date(2025, 4, 16), // May 16, 2025
    title: "Deixe Brilhar a Sua Luz",
    verse: "Mateus 5:16",
    verseText: "Assim brilhe a luz de vocês diante dos homens, para que vejam as suas boas obras e glorifiquem ao Pai de vocês, que está nos céus.",
    content: "Ser luz em um mundo de trevas não é uma opção para o cristão, mas um chamado direto de Jesus. Quando permitimos que nossa luz brilhe através de ações de amor, bondade e serviço, não estamos apenas iluminando o caminho para outros, mas também glorificando a Deus. Nossa conduta diária deve refletir os valores do Reino, de forma que as pessoas possam ver Cristo em nós.\n\nPergunte a si mesmo hoje: 'Minhas ações estão apontando outros para Cristo?' Que possamos viver de forma que nosso testemunho seja evidente não apenas em nossas palavras, mas principalmente em nossas atitudes cotidianas.",
    prayer: "Senhor, ajuda-me a ser luz em todos os ambientes que frequento. Que minhas ações e palavras demonstrem Teu amor e Tua graça, atraindo outros para Ti. Que eu nunca esconda a luz que colocaste em mim, mas que ela brilhe para Tua glória. Em nome de Jesus, amém.",
    application: "Faça algo hoje que demonstre o amor de Cristo a alguém que não esperaria receber bondade. Pode ser um gesto simples como uma palavra de encorajamento, uma ajuda prática ou um ato de generosidade."
  },
  {
    id: "2",
    date: new Date(2025, 4, 17), // May 17, 2025
    title: "Confie no Senhor",
    verse: "Provérbios 3:5-6",
    verseText: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.",
    content: "A verdadeira sabedoria começa quando reconhecemos que nossa compreensão é limitada. A instrução de confiar no Senhor 'de todo o coração' nos chama a uma entrega completa, não parcial. Muitas vezes queremos manter o controle de certas áreas de nossas vidas, confiando em nossa própria sabedoria ou experiência.\n\nO desafio que enfrentamos diariamente é reconhecer Deus em TODOS os nossos caminhos - não apenas nas grandes decisões, mas em cada aspecto do nosso dia. Quando vivemos com essa consciência constante da presença e direção divina, experimentamos a promessa de que Ele endireitará nossas veredas.",
    prayer: "Pai Celestial, perdoa-me pelos momentos em que confio mais em minha própria sabedoria do que em Ti. Ajuda-me a reconhecer Tua presença em cada aspecto da minha vida e a buscar Tua direção em todas as minhas decisões. Entrego a Ti o controle da minha vida. Em nome de Jesus, amém.",
    application: "Identifique uma área da sua vida onde você tem relutado em confiar totalmente em Deus. Faça uma oração específica de entrega dessa área e anote os resultados ao longo da semana."
  },
  {
    id: "3",
    date: new Date(2025, 4, 18), // May 18, 2025
    title: "O Poder da Gratidão",
    verse: "1 Tessalonicenses 5:18",
    verseText: "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.",
    content: "A gratidão não é apenas uma resposta emocional às boas circunstâncias, mas uma disciplina espiritual que devemos praticar em todas as situações. Paulo não nos instrui a sermos gratos pelas dificuldades em si, mas a mantermos uma atitude de gratidão mesmo em meio às provações.\n\nQuando praticamos a gratidão nas circunstâncias difíceis, reconhecemos a soberania de Deus e Sua capacidade de operar todas as coisas para o nosso bem. A gratidão transforma nossa perspectiva e nos capacita a ver além das circunstâncias imediatas, focando no caráter imutável de Deus e em Suas promessas eternas.",
    prayer: "Senhor, obrigado por estar presente em todas as circunstâncias da minha vida. Ajuda-me a desenvolver um coração constantemente grato, que reconhece Tua bondade mesmo nos momentos difíceis. Que minha gratidão seja um testemunho da minha confiança em Ti. Em nome de Jesus, amém.",
    application: "Comece um diário de gratidão. Escreva diariamente três coisas pelas quais você é grato, incluindo pelo menos uma que seja relacionada a uma situação desafiadora que você esteja enfrentando."
  }
];

const DevocionalPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  
  // Find devotional for selected date or use the first one as default
  const currentDevotional = devotionals.find(
    (dev) => dev.date.toDateString() === selectedDate.toDateString()
  ) || devotionals[0];
  
  // Navigation functions
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
              <Card className="overflow-hidden">
                <div className="bg-one-way-blue text-white p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{currentDevotional.title}</h2>
                    <div className="text-right">
                      <div className="text-sm opacity-90">
                        {format(currentDevotional.date, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="bg-blue-50 border-l-4 border-one-way-blue p-4 mb-6">
                    <h3 className="font-bold mb-2">{currentDevotional.verse}</h3>
                    <p className="italic">"{currentDevotional.verseText}"</p>
                  </div>

                  <div className="prose max-w-none">
                    {currentDevotional.content.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-3">Oração</h3>
                    <div className="bg-gray-50 p-4 rounded-md italic">
                      {currentDevotional.prayer}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-3">Aplicação Prática</h3>
                    <div className="border border-gray-200 p-4 rounded-md">
                      {currentDevotional.application}
                    </div>
                  </div>

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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DevocionalPage;
