import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Toggle om alle diensten beschikbaar te maken of alleen de gefocuste diensten
const SHOW_ALL_SERVICES = false; // Zet op true om alle diensten weer beschikbaar te maken

const allDienstenItems = [{
  title: 'Kozijntechniek',
  path: '/diensten/kozijntechniek'
}, {
  title: 'Isolatietechniek',
  path: '/diensten/isolatietechniek'
}, {
  title: 'Dakkapel',
  path: '/diensten/dakkapel'
}, {
  title: 'Schilderwerk',
  path: '/diensten/schilderwerk'
}, {
  title: 'Dakrenovatie',
  path: '/diensten/dakrenovatie'
}, {
  title: 'Stukadoren',
  path: '/diensten/stukadoren'
}, {
  title: 'Installatietechniek',
  path: '/diensten/installatietechniek'
}, {
  title: 'Aan- en verbouw',
  path: '/diensten/aan-en-verbouw'
}, {
  title: 'Behangen',
  path: '/diensten/behangen'
}, {
  title: 'PVC Vloeren',
  path: '/diensten/pvc-vloeren'
}];

// Gefocuste diensten die altijd beschikbaar zijn
const focusedServices = ['Dakkapel', 'Schilderwerk', 'Stukadoren'];

// Filter diensten op basis van de toggle
const dienstenItems = SHOW_ALL_SERVICES 
  ? allDienstenItems 
  : allDienstenItems.filter(dienst => focusedServices.includes(dienst.title));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDienstenHovered, setIsDienstenHovered] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  const isActive = (path: string) => {
    if (path === '/diensten' && (location.pathname === '/diensten' || location.pathname.startsWith('/diensten/'))) {
      return true;
    }
    return location.pathname === path;
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  };
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1, y: 0, height: 'auto',
      transition: { duration: 0.3, staggerChildren: 0.05 }
    },
    exit: { opacity: 0, y: -10, height: 0, transition: { duration: 0.2 } }
  };
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1, height: 'auto',
      transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.1 }
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } }
  };

  // Responsive sticky header: alleen sticky vanaf "md", op mobiel relative (niet sticky)
  const headerClass = cn(
    "w-full transition-all duration-300 z-50",
    "md:fixed", // Sticky alleen op md en groter
    "md:top-0",
    scrolled ? "md:bg-white md:shadow-md" : "md:bg-white/95",
    "relative md:static", // Op mobiel relative zodat menu niet voor content blijft staan
  );

  return (
    <header className={headerClass}>
      <div className="bg-brand-darkGreen text-white py-2">
        <div className="container flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <motion.a href="tel:+31854444255" className="flex items-center space-x-1 hover:text-brand-lightGreen transition-colors text-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Phone className="h-4 w-4" />
              <span>085 4444 255</span>
            </motion.a>
            <motion.a href="mailto:info@refurbishtotaalnederland.nl" className="flex items-center space-x-1 hover:text-brand-lightGreen transition-colors text-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Mail className="h-4 w-4" />
              <span>info@refurbishtotaalnederland.nl</span>
            </motion.a>
          </div>
          <div className="flex items-center space-x-2">
            <motion.a href="https://maps.google.com/?q=Postbus+61,+6650+AB+Druten" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-brand-lightGreen transition-colors text-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <MapPin className="h-4 w-4" />
              <span>Postbus 61, 6650 AB Druten</span>
            </motion.a>
          </div>
        </div>
      </div>
      <div className="container py-2 md:py-4">
        <nav className="flex justify-between items-center min-h-[48px]">
          <Link to="/" className="flex items-center">
            <div className="bg-brand-darkGreen p-2 rounded-md">
              <img alt="Refurbish Totaal Nederland" className="h-10 w-auto object-contain" src="/lovable-uploads/01e952fe-5435-4105-9ea9-5e2a423020c6.png" />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={cn("font-medium transition-colors hover-underline", isActive('/') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen")}>
              Home
            </Link>
            <div className="relative" onMouseEnter={() => setIsDienstenHovered(true)} onMouseLeave={() => setIsDienstenHovered(false)}>
              <Link to="/diensten" className={cn("font-medium transition-colors hover-underline flex items-center", isActive('/diensten') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen")}>
                Diensten <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDienstenHovered ? 'rotate-180' : ''}`} />
              </Link>
              <AnimatePresence>
                {isDienstenHovered && <motion.div className="absolute left-0 mt-2 w-60 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden" variants={dropdownVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="py-1">
                    {dienstenItems.map(dienst => <motion.div key={dienst.path} variants={menuItemVariants}>
                      <Link to={dienst.path} className={cn("block px-4 py-2 text-sm hover:bg-gray-100 hover:text-brand-darkGreen", location.pathname === dienst.path ? "text-brand-lightGreen bg-gray-50" : "text-gray-700")}>
                        {dienst.title}
                      </Link>
                    </motion.div>)}
                  </div>
                </motion.div>}
              </AnimatePresence>
            </div>
            <Link to="/over-ons" className={cn("font-medium transition-colors hover-underline", isActive('/over-ons') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen")}>
              Over Ons
            </Link>
            <Link to="/projecten" className={cn("font-medium transition-colors hover-underline", isActive('/projecten') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen")}>
              Projecten
            </Link>
            <Link to="/contact" className={cn("font-medium transition-colors hover-underline", isActive('/contact') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen")}>
              Contact
            </Link>
            <Link to="/marketplace" className={cn("font-medium transition-colors hover-underline", isActive('/marketplace') ? "text-brand-lightGreen" : "hover:text-brand-lightGreen")}>
              Marketplace
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="bg-brand-lightGreen hover:bg-opacity-90">
                <Link to="/offerte">Offerte Aanvragen</Link>
              </Button>
            </motion.div>
          </div>
          <div className="md:hidden">
            <motion.button onClick={toggleMenu} className="p-2 rounded-md text-gray-600 hover:text-brand-lightGreen hover:bg-gray-100" whileTap={{ scale: 0.9 }}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </nav>
      </div>
      <AnimatePresence>
        {isMenuOpen && <motion.div className="md:hidden bg-white border-t overflow-hidden" variants={mobileMenuVariants} initial="hidden" animate="visible" exit="exit">
          <div className="container py-3 flex flex-col space-y-3">
            <motion.div variants={menuItemVariants}>
              <Link to="/" className={cn("font-medium px-3 py-2 rounded-md hover:bg-gray-100 block", isActive('/') ? "text-brand-lightGreen" : "")} onClick={toggleMenu}>
                Home
              </Link>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <Link to="/diensten" className={cn("font-medium px-3 py-2 rounded-md hover:bg-gray-100 block", isActive('/diensten') ? "text-brand-lightGreen" : "")} onClick={() => {}}>
                Diensten
              </Link>
              <div className="pl-6 space-y-1 mt-1">
                {dienstenItems.map(dienst => <motion.div key={dienst.path} variants={menuItemVariants}>
                  <Link to={dienst.path} className={cn("block px-3 py-1 rounded-md text-sm hover:bg-gray-100", location.pathname === dienst.path ? "text-brand-lightGreen" : "")} onClick={toggleMenu}>
                    {dienst.title}
                  </Link>
                </motion.div>)}
              </div>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <Link to="/over-ons" className={cn("font-medium px-3 py-2 rounded-md hover:bg-gray-100 block", isActive('/over-ons') ? "text-brand-lightGreen" : "")} onClick={toggleMenu}>
                Over Ons
              </Link>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <Link to="/projecten" className={cn("font-medium px-3 py-2 rounded-md hover:bg-gray-100 block", isActive('/projecten') ? "text-brand-lightGreen" : "")} onClick={toggleMenu}>
                Projecten
              </Link>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <Link to="/contact" className={cn("font-medium px-3 py-2 rounded-md hover:bg-gray-100 block", isActive('/contact') ? "text-brand-lightGreen" : "")} onClick={toggleMenu}>
                Contact
              </Link>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <Link to="/marketplace" className={cn("font-medium px-3 py-2 rounded-md hover:bg-gray-100 block", isActive('/marketplace') ? "text-brand-lightGreen" : "")} onClick={toggleMenu}>
                Marketplace
              </Link>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <Button asChild className="bg-brand-lightGreen hover:bg-opacity-90 w-full">
                <Link to="/offerte" onClick={toggleMenu}>Offerte Aanvragen</Link>
              </Button>
            </motion.div>
            <motion.div variants={menuItemVariants} className="flex items-center mt-4 space-x-3 text-sm text-left">
              <a href="tel:+31854444255" className="flex items-center space-x-1 hover:text-brand-lightGreen">
                <Phone className="h-4 w-4" />
                <span>085 4444 255</span>
              </a>
              <a href="mailto:info@refurbishtotaalnederland.nl" className="flex items-center space-x-1 hover:text-brand-lightGreen">
                <Mail className="h-4 w-4" />
                <span>info@refurbishtotaalnederland.nl</span>
              </a>
            </motion.div>
            <motion.div variants={menuItemVariants} className="flex items-center space-x-3 text-sm text-left">
              <a href="https://maps.google.com/?q=Postbus+61,+6650+AB+Druten" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-brand-lightGreen">
                <MapPin className="h-4 w-4" />
                <span>Postbus 61, 6650 AB Druten</span>
              </a>
            </motion.div>
          </div>
        </motion.div>}
      </AnimatePresence>
    </header>
  );
};

export default Header;
