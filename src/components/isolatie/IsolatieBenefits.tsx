
import React from 'react';
import { Thermometer, Wallet, Clock, Shield, Leaf, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const IsolatieBenefits = () => {
  const benefits = [
    {
      icon: <Thermometer className="h-10 w-10 text-brand-lightGreen" />,
      title: "Comfortabeler wonen",
      description: "Een goed geïsoleerde woning voelt comfortabeler. Minder tocht, een constantere temperatuur en minder geluidsoverlast van buiten."
    },
    {
      icon: <Wallet className="h-10 w-10 text-brand-lightGreen" />,
      title: "Tot 60% energiebesparing",
      description: "Verlaag uw energierekening aanzienlijk door warmteverlies te voorkomen. Bespaar tot wel 60% op uw stookkosten."
    },
    {
      icon: <Leaf className="h-10 w-10 text-brand-lightGreen" />,
      title: "CO2-uitstoot verminderen",
      description: "Draag bij aan een beter milieu door uw CO2-uitstoot te verminderen. Goed geïsoleerd betekent minder energieverbruik."
    },
    {
      icon: <Home className="h-10 w-10 text-brand-lightGreen" />,
      title: "Waarde van uw woning verhogen",
      description: "Een goed geïsoleerde woning heeft een hoger energielabel en is meer waard. Een slimme investering voor de toekomst."
    },
    {
      icon: <Clock className="h-10 w-10 text-brand-lightGreen" />,
      title: "Binnen één dag geïnstalleerd",
      description: "De meeste isolatieoplossingen kunnen binnen één dag worden geïnstalleerd. Minimale overlast, maximaal resultaat."
    },
    {
      icon: <Shield className="h-10 w-10 text-brand-lightGreen" />,
      title: "Gecertificeerde kwaliteit",
      description: "Wij werken alleen met KIWA en IKOB gecertificeerde materialen. Kwaliteit staat voorop bij al onze isolatieoplossingen."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-darkGreen">
            Waarom kiezen voor woningisolatie?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Een goed geïsoleerde woning levert direct voordeel op voor uw portemonnee én het milieu.
            Ontdek de voordelen van professionele isolatie door Isolatie Selectie.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className="border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IsolatieBenefits;
