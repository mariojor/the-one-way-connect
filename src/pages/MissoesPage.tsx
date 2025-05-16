
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Flag } from "lucide-react";

const MissoesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <Flag className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Missões</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Relatórios e campanhas evangelísticas: como a Palavra de Deus está alcançando os confins da terra.
            </p>
          </div>

          <div className="bg-one-way-blue text-white p-8 rounded-lg text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Página em construção</h2>
            <p>Estamos preparando conteúdo inspirador sobre a obra missionária. Volte em breve!</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MissoesPage;
