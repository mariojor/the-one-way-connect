
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-24 xl:pb-32">
          <div className="container-custom pt-10 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-one-way-gray-dark sm:text-5xl md:text-6xl">
                <span className="block xl:inline">O Caminho, a Verdade</span>{" "}
                <span className="block text-one-way-blue xl:inline">e a Vida</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Fortalecendo sua fé e caminhada cristã diariamente com estudos bíblicos, 
                notícias, vídeos, orações e muito mais para sua edificação espiritual.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-md text-white bg-one-way-blue hover:bg-one-way-blue/90" asChild>
                    <Link to="/devocional">
                      Devocional do Dia
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center px-8 py-6 border border-one-way-blue text-base font-medium rounded-md text-one-way-blue bg-white hover:bg-one-way-blue-light"
                    asChild
                  >
                    <Link to="/estudos">
                      Nossos Estudos
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-one-way-blue-light sm:h-72 md:h-96 lg:w-full lg:h-full"></div>
      </div>
    </div>
  );
};

export default Hero;
