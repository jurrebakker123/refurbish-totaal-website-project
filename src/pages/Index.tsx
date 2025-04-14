
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ProjectsPreview from '@/components/ProjectsPreview';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <ProjectsPreview />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
