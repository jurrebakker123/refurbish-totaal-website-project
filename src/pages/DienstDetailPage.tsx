
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallToActionSection from '@/components/CallToActionSection';
import diensten from '@/data/diensten';

// Import our new components
import DienstHero from '@/components/dienst-detail/DienstHero';
import DienstFeatures from '@/components/dienst-detail/DienstFeatures';
import DienstBenefits from '@/components/dienst-detail/DienstBenefits';
import DienstFAQs from '@/components/dienst-detail/DienstFAQs';
import DienstSidebar from '@/components/dienst-detail/DienstSidebar';
import DienstNotFound from '@/components/dienst-detail/DienstNotFound';

const DienstDetailPage = () => {
  const { serviceId } = useParams<{serviceId: string}>();
  const dienst = serviceId && diensten[serviceId as keyof typeof diensten];

  useEffect(() => {
    if (!dienst) {
      console.error(`Dienst met ID ${serviceId} bestaat niet.`);
    } else {
      // Scroll naar boven bij het laden van een nieuwe dienst
      window.scrollTo(0, 0);
    }
  }, [dienst, serviceId]);

  // Handle redirect from old "stucadoren" URL to new "stukadoren" URL
  useEffect(() => {
    if (serviceId === 'stucadoren') {
      window.location.replace('/diensten/stukadoren');
    }
  }, [serviceId]);

  if (!dienst) {
    return <DienstNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        {/* Hero Section */}
        <DienstHero dienst={dienst} serviceId={serviceId || ''} />

        {/* Main Content */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
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

              {/* Sidebar */}
              <DienstSidebar 
                currentServiceId={serviceId || ''} 
                diensten={diensten}
                dienstTitle={dienst.title} 
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default DienstDetailPage;
