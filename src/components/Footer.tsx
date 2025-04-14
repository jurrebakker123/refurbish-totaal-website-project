
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-darkGreen text-white pt-16 pb-8">
      <div className="container">
        {/* Top Footer Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span>Refurbish Totaal</span>
              <span className="text-brand-lightGreen ml-1">Nederland</span>
            </h3>
            <p className="mb-4 text-gray-300">
              Wij zijn uw betrouwbare partner voor al uw verbouwings- en renovatieprojecten in heel Nederland.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="hover:text-brand-lightGreen transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-brand-lightGreen transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-brand-lightGreen transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-brand-lightGreen transition-colors hover-underline">Home</Link>
              </li>
              <li>
                <Link to="/diensten" className="hover:text-brand-lightGreen transition-colors hover-underline">Onze Diensten</Link>
              </li>
              <li>
                <Link to="/over-ons" className="hover:text-brand-lightGreen transition-colors hover-underline">Over Ons</Link>
              </li>
              <li>
                <Link to="/projecten" className="hover:text-brand-lightGreen transition-colors hover-underline">Projecten</Link>
              </li>
              <li>
                <Link to="/offerte" className="hover:text-brand-lightGreen transition-colors hover-underline">Offerte Aanvragen</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-lightGreen transition-colors hover-underline">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-4">Onze Diensten</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/diensten/schilderwerk" className="hover:text-brand-lightGreen transition-colors hover-underline">Schilderwerk</Link>
              </li>
              <li>
                <Link to="/diensten/dakrenovatie" className="hover:text-brand-lightGreen transition-colors hover-underline">Dakrenovatie</Link>
              </li>
              <li>
                <Link to="/diensten/stucadoren" className="hover:text-brand-lightGreen transition-colors hover-underline">Stucadoren</Link>
              </li>
              <li>
                <Link to="/diensten/installatietechniek" className="hover:text-brand-lightGreen transition-colors hover-underline">Installatietechniek</Link>
              </li>
              <li>
                <Link to="/diensten/aan-en-verbouw" className="hover:text-brand-lightGreen transition-colors hover-underline">Aan- en verbouw</Link>
              </li>
              <li>
                <Link to="/diensten/pvc-vloeren" className="hover:text-brand-lightGreen transition-colors hover-underline">PVC Vloeren</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold mb-4">Contact Informatie</h3>
            <ul className="space-y-4">
              <li className="flex items-start hover:text-brand-lightGreen transition-colors">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-brand-lightGreen" />
                <span>020-123 4567</span>
              </li>
              <li className="flex items-start hover:text-brand-lightGreen transition-colors">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-brand-lightGreen" />
                <span>info@refurbishtotaal.nl</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-brand-lightGreen" />
                <span>Exempelstraat 123, 1234 AB Amsterdam</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-0.5 text-brand-lightGreen" />
                <span>Maandag-Vrijdag: 08:00-17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-700 text-center md:flex md:justify-between md:text-left text-sm text-gray-300">
          <p>© {currentYear} Refurbish Totaal Nederland. Alle rechten voorbehouden.</p>
          <div className="mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-brand-lightGreen transition-colors hover-underline mr-4">Privacybeleid</Link>
            <Link to="/voorwaarden" className="hover:text-brand-lightGreen transition-colors hover-underline">Algemene Voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
