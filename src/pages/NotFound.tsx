
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="container max-w-md text-center px-4">
          <h1 className="text-6xl font-bold text-brand-blue mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oeps! Deze pagina bestaat niet.</p>
          <p className="text-gray-500 mb-8">
            De pagina die u probeert te bezoeken bestaat niet of is verplaatst.
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-block"
          >
            Terug naar Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
