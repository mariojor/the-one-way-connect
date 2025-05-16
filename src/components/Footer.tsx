
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold text-one-way-blue">The One Way</span>
            </Link>
            <p className="text-gray-600 mt-4">
              Um portal cristão evangélico dedicado ao fortalecimento da fé e apoio à vida cristã prática.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Navegação Rápida</h3>
            <ul className="space-y-2">
              {["Início", "Estudo Bíblico", "Notícias", "Vídeos", "Oração"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-600 hover:text-one-way-blue transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              {["Estudos Bíblicos", "Devocionais", "Testemunhos", "Eventos", "Ministérios"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-600 hover:text-one-way-blue transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Conecte-se</h3>
            <ul className="space-y-2">
              {["Facebook", "Instagram", "YouTube", "Podcast", "Contato"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-600 hover:text-one-way-blue transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} The One Way. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-one-way-blue transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-one-way-blue transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
