import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContentSection from "@/components/ContentSection";
import CategoryCard from "@/components/CategoryCard";
import Newsletter from "@/components/Newsletter";
import { Book, Newspaper, Video, MessageSquare, Heart, Music, Home, Users, Church, Flag, Calendar, FileText } from "lucide-react";

const Index = () => {
  // Sample data for content sections
  const featureStudies = [
    {
      id: "1",
      title: "O Caminho da Salvação",
      description: "Um estudo profundo sobre o plano de Deus para redenção da humanidade através de Jesus Cristo.",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      link: "/estudos/1"
    },
    {
      id: "2",
      title: "Frutos do Espírito",
      description: "Explorando as características que o Espírito Santo desenvolve na vida do cristão comprometido.",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      link: "/estudos/2"
    },
    {
      id: "3",
      title: "Armadura de Deus",
      description: "Como podemos nos proteger das armadilhas espirituais usando a armadura que Deus nos fornece.",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      link: "/estudos/3"
    }
  ];

  const latestNews = [
    {
      id: "1",
      title: "Conferência Nacional de Missões",
      description: "Maior evento missionário do país reúne mais de 5 mil participantes em São Paulo.",
      imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      link: "/noticias/1"
    },
    {
      id: "2",
      title: "Igreja Distribui 10 Mil Bíblias",
      description: "Projeto evangelístico alcança comunidades carentes no interior do Nordeste.",
      imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
      link: "/noticias/2"
    },
    {
      id: "3",
      title: "Novo App de Estudo Bíblico",
      description: "Ferramenta gratuita auxilia cristãos a aprofundarem conhecimento das escrituras.",
      imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      link: "/noticias/3"
    }
  ];

  // Main categories with icons - updated with available icons
  const categories = [
    // { title: "Estudo Bíblico", description: "Devocionais diários e comentários bíblicos", icon: Book, link: "/estudos" },
    { title: "Notícias Cristãs", description: "Atualidades do mundo cristão", icon: Newspaper, link: "/noticias" },
    // { title: "Vídeos & Podcasts", description: "Pregações, entrevistas e estudos", icon: Video, link: "/midia" },
    { title: "Oração", description: "Pedidos de oração e devocionais", icon: Heart, link: "/oracao" }
    // { title: "Louvor", description: "Músicas, letras e playlists gospel", icon: Music, link: "/louvor" },
    // { title: "Família", description: "Casamento, filhos e relacionamentos", icon: Home, link: "/familia" },
    // { title: "Juventude", description: "Discipulado jovem e temas atuais", icon: Users, link: "/juventude" },
    // { title: "Ministério", description: "Recursos para pastores e líderes", icon: Church, link: "/lideranca" },
    // { title: "Missões", description: "Relatórios e campanhas evangelísticas", icon: Flag, link: "/missoes" },
    // { title: "Eventos", description: "Conferências, cultos e congressos", icon: Calendar, link: "/eventos" },
    // { title: "Artigos", description: "Reflexões e colunas de opinião cristã", icon: FileText, link: "/artigos" },
    // { title: "Comunidade", description: "Fóruns e grupos de discussão", icon: MessageSquare, link: "/comunidade" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="section-title text-center mb-12">Navegue por Categoria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.title}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  link={category.link}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Studies Section */}
        <ContentSection
          title="Estudos em Destaque"
          description="Aprofunde sua vida espiritual com estudos bíblicos relevantes e transformadores."
          items={featureStudies}
          viewAllLink="/estudos"
        />
        
        {/* Latest News Section */}
        <ContentSection
          title="Últimas Notícias"
          description="Fique por dentro das principais notícias do mundo cristão."
          items={latestNews}
          viewAllLink="/noticias"
        />
        
        {/* Call to action - Daily devotional */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="bg-one-way-blue-light rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-3/5 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Devocional Diário</h2>
                <p className="text-gray-700 mb-4">
                  Comece seu dia na presença de Deus. Nosso devocional diário traz reflexões bíblicas 
                  práticas para fortalecer sua fé e guiar seu caminho cristão.
                </p>
                <a href="/devocional" className="btn-primary inline-block">
                  Ler o Devocional de Hoje
                </a>
              </div>
              <div className="md:w-2/5">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Hoje em Mateus 5:16</h3>
                  <p className="italic text-gray-700 mb-4">
                    "Assim brilhe a luz de vocês diante dos homens, para que vejam as suas boas obras 
                    e glorifiquem ao Pai de vocês, que está nos céus."
                  </p>
                  <span className="text-sm text-gray-500">16 de maio, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
