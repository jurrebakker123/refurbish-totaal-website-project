
export function OfferteHero() {
  return (
    <section className="relative py-16">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-brand-darkGreen bg-opacity-60"></div>
      </div>
      <div className="container relative z-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Offerte Aanvragen</h1>
        <p className="text-xl max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Vraag vrijblijvend een offerte aan voor uw project. Wij nemen binnen 24 uur contact met u op 
          om uw wensen te bespreken en een passende offerte op te stellen.
        </p>
      </div>
    </section>
  );
}

