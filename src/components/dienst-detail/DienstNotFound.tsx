
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DienstNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold text-brand-darkGreen mb-6">Dienst niet gevonden</h1>
          <p className="mb-8">De dienst die u zoekt bestaat niet of is niet beschikbaar.</p>
          <Link to="/diensten" className="btn-primary">
            Bekijk alle diensten
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DienstNotFound;
