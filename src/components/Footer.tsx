
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

// Toggle om alle diensten beschikbaar te maken of alleen de gefocuste diensten
const SHOW_ALL_SERVICES = false; // Zet op true om alle diensten weer beschikbaar te maken

const allServices = [
  { title: 'Kozijntechniek', path: '/diensten/kozijntechniek' },
  { title: 'Isolatietechniek', path: '/diensten/isolatietechniek' },
  { title: 'Dakkapel', path: '/diensten/dakkapel' },
  { title: 'Schilderwerk', path: '/diensten/schilderwerk' },
  { title: 'Dakrenovatie', path: '/diensten/dakrenovatie' },
  { title: 'Stukadoren', path: '/diensten/stukadoren' },
  { title: 'Installatietechniek', path: '/diensten/installatietechniek' },
  { title: 'Aan- en verbouw', path: '/diensten/aan-en-verbouw' },
  { title: 'Behangen', path: '/diensten/behangen' },
  { title: 'PVC Vloeren', path: '/diensten/pvc-vloeren' }
];

// Gefocuste diensten die altijd beschikbaar zijn
const focusedServices = ['Dakkapel', 'Schilderwerk', 'Stukadoren'];

// Filter diensten op basis van de toggle
const visibleServices = SHOW_ALL_SERVICES 
  ? allServices 
  : allServices.filter(service => focusedServices.includes(service.title));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-gray text-white pt-16 pb-8">
      <div className="container">
        {/* Top Footer Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <img src="/lovable-uploads/ec9928bc-599a-4ee3-904b-0e26aebc326c.png" alt="Refurbish Totaal Nederland" className="h-24 w-auto" />
            </div>
            <p className="mb-4 text-gray-300">
              Wij zijn uw betrouwbare partner voor al uw verbouwings- en renovatieprojecten in heel Nederland.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61575351209112" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lightGreen transition-colors" aria-label="Bezoek onze Facebook pagina">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.instagram.com/refurbishtotaalnederland/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lightGreen transition-colors" aria-label="Bezoek onze Instagram pagina">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.linkedin.com/company/refurbish-totaal-nederland/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lightGreen transition-colors" aria-label="Bezoek onze LinkedIn pagina">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
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
                <Link to="/bedrijven" className="hover:text-brand-lightGreen transition-colors hover-underline">Bedrijven</Link>
              </li>
              <li>
                <Link to="/vacatures" className="hover:text-brand-lightGreen transition-colors hover-underline">Vacatures</Link>
              </li>
              <li>
                <Link to="/offerte" className="hover:text-brand-lightGreen transition-colors hover-underline">Offerte Aanvragen</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-lightGreen transition-colors hover-underline">Contact</Link>
              </li>
              <li>
                <Link to="/dakkapel-calculator" className="hover:text-brand-lightGreen transition-colors hover-underline">Dakkapel Calculator</Link>
              </li>
              <li>
                <Link to="/service-selector" className="hover:text-brand-lightGreen transition-colors hover-underline">Schilder & Stucwerk</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <h3 className="text-xl font-bold mb-4">Onze Diensten</h3>
            <ul className="space-y-2">
              {visibleServices.map((service) => (
                <li key={service.path}>
                  <Link to={service.path} className="hover:text-brand-lightGreen transition-colors hover-underline">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>
            <h3 className="text-xl font-bold mb-4">Contact Informatie</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <a href="tel:0854444255" className="flex hover:text-brand-lightGreen transition-colors">
                  <Phone className="h-5 w-5 mr-2 mt-0.5 text-brand-lightGreen" />
                  <span>085 4444 255</span>
                </a>
              </li>
              <li className="flex items-start">
                <a href="mailto:info@refurbishtotaal.nl" className="flex hover:text-brand-lightGreen transition-colors">
                  <Mail className="h-5 w-5 mr-2 mt-0.5 text-brand-lightGreen" />
                  <span>info@refurbishtotaalnederland.nl</span>
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-brand-lightGreen" />
                <span>Postbus 61, 6650 AB Druten</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-700 text-center md:flex md:justify-between md:text-left text-sm text-gray-300">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <p>© {currentYear} Refurbish Totaal Nederland. Alle rechten voorbehouden.</p>
            <p>
              Ontworpen door{" "}
              <a href="https://www.jbe-commerce.nl" target="_blank" rel="noopener noreferrer" className="text-brand-lightGreen hover:underline">
                JBEcommerce
              </a>
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-brand-lightGreen transition-colors hover-underline mr-4">Privacybeleid</Link>
            <Link to="/voorwaarden" className="hover:text-brand-lightGreen transition-colors hover-underline mr-4">Algemene Voorwaarden</Link>
            <Link to="/certificaat" className="hover:text-brand-lightGreen transition-colors hover-underline">Certificering</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
