
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <section className="relative py-16 md:py-24 text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80")', 
        filter: 'brightness(0.5)'
      }}></div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Klaar om uw project te starten?</h2>
          <p className="text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Neem contact met ons op voor een vrijblijvende offerte of om uw wensen te bespreken. 
            Ons team van professionals staat voor u klaar om uw droomproject te realiseren.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link 
              to="/offerte" 
              className="btn-primary hover:animate-pulse"
            >
              Vrijblijvende Offerte
            </Link>
            <Link 
              to="/contact" 
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-darkGreen"
            >
              Contact Opnemen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
