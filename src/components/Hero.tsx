
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white min-h-screen flex items-center pt-20">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Uw partner voor professionele renovatie en verbouwing
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Met meer dan 20 jaar ervaring zorgen wij voor vakkundig en betrouwbaar schilderwerk, 
            dakrenovatie, stucwerk en meer. Voor zowel particuliere als zakelijke klanten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/offerte" 
              className="btn-primary hover:animate-pulse text-center"
            >
              Vrijblijvende Offerte Aanvragen
            </Link>
            <Link 
              to="/projecten" 
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen text-center"
            >
              Bekijk Onze Projecten
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
