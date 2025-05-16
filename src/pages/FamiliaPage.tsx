
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const FamiliaPage = () => {
  const categorias = [
    { 
      id: "casamento", 
      titulo: "Casamento", 
      descricao: "Orientações bíblicas para fortalecer o relacionamento conjugal.",
      imagem: "https://images.unsplash.com/photo-1532911557891-d12f6b98dddc"
    },
    { 
      id: "filhos", 
      titulo: "Filhos", 
      descricao: "Como criar seus filhos com princípios cristãos em um mundo secular.",
      imagem: "https://images.unsplash.com/photo-1504151077144-1c52dce7a363"
    },
    { 
      id: "namoro", 
      titulo: "Namoro Cristão", 
      descricao: "Estabelecendo relacionamentos saudáveis baseados em princípios bíblicos.",
      imagem: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999"
    }
  ];

  const artigos = [
    {
      id: "1",
      titulo: "O Papel do Pai na Família Cristã",
      descricao: "Entenda a função do pai como sacerdote e líder espiritual no lar.",
      autor: "Pr. Roberto Almeida",
      data: "10/05/2025"
    },
    {
      id: "2",
      titulo: "Educação de Filhos em Tempos Difíceis",
      descricao: "Como transmitir valores cristãos aos filhos em uma cultura cada vez mais secular.",
      autor: "Maria Santos",
      data: "05/05/2025"
    },
    {
      id: "3",
      titulo: "Finanças da Família: Uma Visão Bíblica",
      descricao: "Princípios bíblicos para administração financeira familiar.",
      autor: "Carlos Oliveira",
      data: "28/04/2025"
    },
    {
      id: "4",
      titulo: "Resolvendo Conflitos no Casamento",
      descricao: "Estratégias bíblicas para resolver desentendimentos com sabedoria e graça.",
      autor: "Dra. Ana Silva",
      data: "15/04/2025"
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
                <Home className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Família</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Orientações e conselhos bíblicos para cultivar uma família saudável, baseada nos princípios cristãos.
            </p>
          </div>

          {/* Categorias em Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {categorias.map((categoria) => (
              <Link key={categoria.id} to={`/familia/${categoria.id}`}>
                <div className="h-60 relative rounded-lg overflow-hidden group">
                  <img 
                    src={categoria.imagem} 
                    alt={categoria.titulo} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-bold mb-1">{categoria.titulo}</h3>
                    <p className="text-white/80 text-sm">{categoria.descricao}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Artigos Recentes */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Artigos Recentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artigos.map((artigo) => (
                <Card key={artigo.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <span className="text-sm text-gray-500 block mb-1">{artigo.data} • Por {artigo.autor}</span>
                    <h3 className="text-xl font-bold mb-2">{artigo.titulo}</h3>
                    <p className="text-gray-600 mb-4">{artigo.descricao}</p>
                    <Link 
                      to={`/familia/artigos/${artigo.id}`}
                      className="text-one-way-blue hover:text-one-way-blue/80 font-medium"
                    >
                      Ler artigo completo →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FamiliaPage;
