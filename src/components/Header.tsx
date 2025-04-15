
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const dienstenItems = [
  { title: 'Schilderwerk', path: '/diensten/schilderwerk' },
  { title: 'Dakrenovatie', path: '/diensten/dakrenovatie' },
  { title: 'Stucadoren', path: '/diensten/stucadoren' },
  { title: 'Installatietechniek', path: '/diensten/installatietechniek' },
  { title: 'Aan- en verbouw', path: '/diensten/aan-en-verbouw' },
  { title: 'PVC Vloeren', path: '/diensten/pvc-vloeren' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Effect voor scroll animatie
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper to check if the current link is active
  const isActive = (path: string) => {
    // Check if path is exactly the current path or if it's a subpath
    if (path === '/diensten' && (location.pathname === '/diensten' || location.pathname.startsWith('/diensten/'))) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "bg-white shadow-md" : "bg-white/95"
    )}>
      {/* Top bar with contact info */}
      <div className="bg-brand-darkGreen text-white py-2">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-2 md:mb-0">
            <div className="flex items-center space-x-1 hover:text-brand-lightGreen transition-colors">
              <Phone className="h-4 w-4" />
              <a href="tel:+31630136079" className="text-sm">+31 6 30136079</a>
            </div>
            <div className="flex items-center space-x-1 hover:text-brand-lightGreen transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@refurbishtotaal.nl" className="text-sm">info@refurbishtotaal.nl</a>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Ma-Vr: 08:00-17:00</span>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="container py-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-darkGreen">Refurbish Totaal</span>
            <span className="text-brand-lightGreen ml-1 text-2xl font-bold">Nederland</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "font-medium transition-colors hover-underline",
                isActive('/') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen"
              )}
            >
              Home
            </Link>

            <div className="relative group">
              <Link 
                to="/diensten" 
                className={cn(
                  "font-medium transition-colors hover-underline flex items-center",
                  isActive('/diensten') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen"
                )}
              >
                Diensten <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="py-1">
                  {dienstenItems.map((dienst) => (
                    <Link
                      key={dienst.path}
                      to={dienst.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-darkGreen"
                    >
                      {dienst.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              to="/over-ons" 
              className={cn(
                "font-medium transition-colors hover-underline",
                isActive('/over-ons') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen"
              )}
            >
              Over Ons
            </Link>
            <Link 
              to="/projecten" 
              className={cn(
                "font-medium transition-colors hover-underline",
                isActive('/projecten') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen"
              )}
            >
              Projecten
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "font-medium transition-colors hover-underline",
                isActive('/contact') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen"
              )}
            >
              Contact
            </Link>
            <Button asChild className="bg-brand-lightGreen hover:bg-opacity-90">
              <Link to="/offerte">Offerte Aanvragen</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md text-gray-600 hover:text-brand-lightGreen hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slide-in">
          <div className="container py-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className={cn(
                "font-medium px-3 py-2 rounded-md hover:bg-gray-100",
                isActive('/') ? "text-brand-lightGreen" : ""
              )} 
              onClick={toggleMenu}
            >
              Home
            </Link>
            <div>
              <Link 
                to="/diensten" 
                className={cn(
                  "font-medium px-3 py-2 rounded-md hover:bg-gray-100 block",
                  isActive('/diensten') ? "text-brand-lightGreen" : ""
                )} 
                onClick={() => {}}
              >
                Diensten
              </Link>
              <div className="pl-6 space-y-1 mt-1">
                {dienstenItems.map((dienst) => (
                  <Link
                    key={dienst.path}
                    to={dienst.path}
                    className={cn(
                      "block px-3 py-1 rounded-md text-sm hover:bg-gray-100",
                      location.pathname === dienst.path ? "text-brand-lightGreen" : ""
                    )}
                    onClick={toggleMenu}
                  >
                    {dienst.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              to="/over-ons" 
              className={cn(
                "font-medium px-3 py-2 rounded-md hover:bg-gray-100",
                isActive('/over-ons') ? "text-brand-lightGreen" : ""
              )} 
              onClick={toggleMenu}
            >
              Over Ons
            </Link>
            <Link 
              to="/projecten" 
              className={cn(
                "font-medium px-3 py-2 rounded-md hover:bg-gray-100",
                isActive('/projecten') ? "text-brand-lightGreen" : ""
              )} 
              onClick={toggleMenu}
            >
              Projecten
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "font-medium px-3 py-2 rounded-md hover:bg-gray-100",
                isActive('/contact') ? "text-brand-lightGreen" : ""
              )} 
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button asChild className="bg-brand-lightGreen hover:bg-opacity-90 w-full">
              <Link to="/offerte" onClick={toggleMenu}>Offerte Aanvragen</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
