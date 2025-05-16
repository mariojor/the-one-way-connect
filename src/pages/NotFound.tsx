
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-one-way-gray-light py-16">
        <div className="text-center px-4 sm:px-0">
          <h1 className="text-6xl md:text-8xl font-bold font-serif text-one-way-gray-dark mb-6">404</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">Ops! Esta página não foi encontrada</p>
          <p className="text-gray-600 mb-12 max-w-md mx-auto">
            A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
          </p>
          <Link to="/">
            <Button className="flex items-center gap-2">
              <Home size={18} /> Voltar para a Página Inicial
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
