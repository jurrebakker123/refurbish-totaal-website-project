
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar with contact info */}
      <div className="bg-brand-blue text-white py-2">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-2 md:mb-0">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span className="text-sm">020-123 4567</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span className="text-sm">info@refurbishtotaal.nl</span>
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
            <span className="text-2xl font-bold text-brand-blue">Refurbish Totaal</span>
            <span className="text-brand-orange ml-1 text-2xl font-bold">Nederland</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-brand-orange transition-colors">Home</Link>
            <Link to="/diensten" className="font-medium hover:text-brand-orange transition-colors">Diensten</Link>
            <Link to="/over-ons" className="font-medium hover:text-brand-orange transition-colors">Over Ons</Link>
            <Link to="/projecten" className="font-medium hover:text-brand-orange transition-colors">Projecten</Link>
            <Link to="/contact" className="font-medium hover:text-brand-orange transition-colors">Contact</Link>
            <Button asChild className="bg-brand-orange hover:bg-opacity-90">
              <Link to="/offerte">Offerte Aanvragen</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md text-gray-600 hover:text-brand-orange hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 flex flex-col space-y-3">
            <Link to="/" className="font-medium px-3 py-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>Home</Link>
            <Link to="/diensten" className="font-medium px-3 py-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>Diensten</Link>
            <Link to="/over-ons" className="font-medium px-3 py-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>Over Ons</Link>
            <Link to="/projecten" className="font-medium px-3 py-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>Projecten</Link>
            <Link to="/contact" className="font-medium px-3 py-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>Contact</Link>
            <Button asChild className="bg-brand-orange hover:bg-opacity-90 w-full">
              <Link to="/offerte" onClick={toggleMenu}>Offerte Aanvragen</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
