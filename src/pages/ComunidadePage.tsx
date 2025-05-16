
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare } from "lucide-react";

const ComunidadePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-one-way-blue-light flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-one-way-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">Comunidade</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Junte-se à nossa comunidade para discussões, compartilhamento de experiências e crescimento mútuo na fé.
            </p>
          </div>

          <div className="bg-one-way-blue text-white p-8 rounded-lg text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Página em construção</h2>
            <p>Em breve você poderá interagir com outros cristãos em nossa plataforma de comunidade!</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComunidadePage;
