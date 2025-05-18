import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-one-way-blue text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">Sobre Nós</h4>
            <p className="text-sm text-white/70">
              Somos uma comunidade cristã apaixonada por compartilhar o amor de Deus e edificar vidas através da fé.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="text-sm">
              <li className="mb-2">
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/estudos" className="text-white/70 hover:text-white transition-colors">
                  Estudos Bíblicos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/noticias" className="text-white/70 hover:text-white transition-colors">
                  Notícias
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/eventos" className="text-white/70 hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <p className="text-sm text-white/70">
              Email: contato@onewaychristiancenter.com
            </p>
            <p className="text-sm text-white/70">
              Telefone: (11) 1234-5678
            </p>
            <p className="text-sm text-white/70">
              Endereço: Rua da Igreja, 123 - Centro
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <Link to="#" className="text-white/70 hover:text-white transition-colors">
                Facebook
              </Link>
              <Link to="#" className="text-white/70 hover:text-white transition-colors">
                Instagram
              </Link>
              <Link to="#" className="text-white/70 hover:text-white transition-colors">
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom mt-8 pt-4 border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} One Way Christian Center. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0">
            <Link 
              to="/admin/login" 
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Portal Administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
