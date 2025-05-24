
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/diensten', label: 'Diensten' },
    { href: '/projecten', label: 'Projecten' },
    { href: '/over-ons', label: 'Over Ons' },
    { href: '/dakkapel', label: 'Dakkapellen' },
    { href: '/zonnepanelen', label: 'Zonnepanelen' },
    { href: '/isolatie-selectie', label: 'Isolatie' },
    { href: '/bouwhulp', label: 'Bouwhulp' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg py-2' 
        : 'bg-white/95 backdrop-blur-sm py-4'
    }`}>
      {/* Top contact bar */}
      <div className="bg-brand-darkGreen text-white py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:+31612345678" className="flex items-center space-x-1 hover:text-brand-lightGreen transition-colors">
              <Phone className="h-4 w-4" />
              <span>+31 6 12 34 56 78</span>
            </a>
            <a href="mailto:info@refurbishtotaal.nl" className="flex items-center space-x-1 hover:text-brand-lightGreen transition-colors">
              <Mail className="h-4 w-4" />
              <span>info@refurbishtotaal.nl</span>
            </a>
          </div>
          <div className="hidden md:block">
            <span>Gratis inspectie & advies</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-brand-lightGreen rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <div className="font-bold text-lg text-brand-darkGreen">Refurbish Totaal</div>
              <div className="text-sm text-gray-600">Nederland</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-gray-700 hover:text-brand-lightGreen transition-colors font-medium ${
                  location.pathname === link.href ? 'text-brand-lightGreen' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/offerte" 
              className="btn-primary hover:animate-pulse"
            >
              Gratis Offerte
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-gray-700 hover:text-brand-lightGreen transition-colors font-medium ${
                    location.pathname === link.href ? 'text-brand-lightGreen' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/offerte" className="btn-primary w-fit">
                Gratis Offerte
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
