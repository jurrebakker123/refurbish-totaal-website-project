
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Heart, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InterestConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const response = searchParams.get('response');
  const type = searchParams.get('type');
  const [requestId] = useState(searchParams.get('id'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isInterested = response === 'ja';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            {/* Icon */}
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isInterested ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              {isInterested ? (
                <Heart className="w-10 h-10 text-green-600" />
              ) : (
                <CheckCircle className="w-10 h-10 text-blue-600" />
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isInterested ? 'Bedankt voor uw interesse!' : 'Bedankt voor uw reactie!'}
            </h1>

            {/* Message */}
            <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {isInterested ? (
                <div className="space-y-4">
                  <p>
                    Geweldig dat u interesse heeft! Wij zijn verheugd om met u aan de slag te gaan.
                  </p>
                  <p className="font-semibold text-green-700">
                    Een van onze specialisten neemt binnen 24 uur contact met u op om de mogelijkheden te bespreken en een afspraak in te plannen.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>
                    Bedankt dat u de tijd heeft genomen om te reageren op onze offerte.
                  </p>
                  <p>
                    Mocht u in de toekomst alsnog interesse hebben of vragen hebben, dan staan wij altijd voor u klaar.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={() => window.location.href = 'https://refurbishtotaalnederland.nl'}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              >
                Terug naar website
              </Button>
              
              {isInterested && (
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = `https://refurbishtotaalnederland.nl/${type === 'zonnepaneel' ? 'zonnepanelen' : 'dakkapel'}`}
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
                >
                  Bekijk meer {type === 'zonnepaneel' ? 'zonnepanelen' : 'dakkapellen'}
                </Button>
              )}
            </div>

            {/* Contact Information */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Heeft u vragen? Neem contact op!
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>085-1301578</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span>info@refurbishtotaalnederland.nl</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span>www.refurbishtotaalnederland.nl</span>
                </div>
              </div>
            </div>

            {/* Additional Info for Interested Customers */}
            {isInterested && (
              <div className="bg-green-50 rounded-lg p-6 mt-8">
                <h4 className="font-semibold text-green-800 mb-2">Wat gebeurt er nu?</h4>
                <div className="text-sm text-green-700 space-y-2">
                  <p>✓ Uw interesse is geregistreerd</p>
                  <p>✓ Een specialist neemt binnen 24 uur contact op</p>
                  <p>✓ Samen bespreken we de mogelijkheden</p>
                  <p>✓ Wij plannen een afspraak op locatie in</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterestConfirmationPage;
