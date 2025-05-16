
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const navItems = [
  { name: "Início", href: "/" },
  { name: "Estudo Bíblico", href: "/estudos" },
  { name: "Notícias", href: "/noticias" },
  { name: "Vídeos & Podcasts", href: "/midia" },
  { name: "Oração", href: "/oracao" },
  { name: "Louvor", href: "/louvor" },
  { name: "Família", href: "/familia" },
  { name: "Juventude", href: "/juventude" },
  { name: "Mais", href: "#", isDropdown: true }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-serif font-bold text-one-way-blue">The One Way</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-one-way-gray-dark hover:text-one-way-blue px-1 py-2 font-medium text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search and Mobile Menu Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-one-way-gray-dark" />
            </button>

            <div className="lg:hidden ml-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-one-way-gray-dark" />
                ) : (
                  <Menu className="h-6 w-6 text-one-way-gray-dark" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-4 space-y-1 border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-one-way-gray-dark hover:bg-one-way-blue-light rounded-md font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-3 border-t">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-one-way-blue focus:ring focus:ring-one-way-blue-light focus:ring-opacity-50"
                placeholder="Buscar estudos, vídeos, notícias..."
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
