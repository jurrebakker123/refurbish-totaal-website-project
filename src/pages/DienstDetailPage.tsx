
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DienstHero from '@/components/dienst-detail/DienstHero';
import DienstFeatures from '@/components/dienst-detail/DienstFeatures';
import DienstBenefits from '@/components/dienst-detail/DienstBenefits';
import DienstFAQs from '@/components/dienst-detail/DienstFAQs';
import DienstSidebar from '@/components/dienst-detail/DienstSidebar';
import DienstNotFound from '@/components/dienst-detail/DienstNotFound';
import CityServiceOptimization from '@/components/CityServiceOptimization';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import diensten from '@/data/diensten';

const DienstDetailPage: React.FC = () => {
  const { serviceId, cityName } = useParams<{ serviceId: string; cityName?: string }>();
  
  const dienst = serviceId ? diensten[serviceId] : undefined;
  
  useEffect(() => {
    // Set document title based on the service and city
    if (dienst) {
      document.title = cityName 
        ? `${dienst.title} ${cityName} | Refurbish Totaal Nederland`
        : `${dienst.title} | Refurbish Totaal Nederland`;
    }
  }, [dienst, cityName]);
  
  // If service not found, render the not found component
  if (!dienst && serviceId) {
    return <DienstNotFound />;
  }
  
  // If service found and we have a dienst object
  if (dienst) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* SEO Optimization Component */}
        {cityName && (
          <CityServiceOptimization 
            service={dienst.title}
            serviceDescription={dienst.description}
          />
        )}
        
        {/* Local Business Schema */}
        <LocalBusinessSchema
          city={cityName} 
          service={dienst.title}
        />
        
        <main className="flex-grow">
          <DienstHero 
            dienst={dienst}
            serviceId={serviceId || ''}
          />
          
          <div className="container py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <DienstFeatures 
                  title={dienst.title}
                  longDescription={dienst.longDescription}
                  features={dienst.features} 
                />
                <DienstBenefits 
                  title={dienst.title}
                  benefits={dienst.benefits} 
                />
                <DienstFAQs faqs={dienst.faqs} />
              </div>
              
              <div className="lg:col-span-1">
                <DienstSidebar 
                  currentServiceId={serviceId || ''}
                  diensten={diensten}
                  dienstTitle={dienst.title}
                />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  // Redirect to diensten page if no serviceId provided
  return <Navigate to="/diensten" />;
};

export default DienstDetailPage;
