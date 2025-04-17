
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DienstenRecord } from '@/data/types/dienst';

interface DienstSidebarProps {
  currentServiceId: string;
  diensten: DienstenRecord;
  dienstTitle: string;
}

const DienstSidebar = ({ currentServiceId, diensten, dienstTitle }: DienstSidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-32">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Offerte aanvragen</h3>
          <p className="text-gray-700 mb-6">
            Bent u geïnteresseerd in onze {dienstTitle.toLowerCase()} diensten? Vraag vrijblijvend een offerte aan.
          </p>
          <Link 
            to="/offerte" 
            className="btn-primary block text-center w-full hover:animate-pulse"
          >
            Vrijblijvende Offerte
          </Link>
        </div>

        <div className="bg-brand-darkGreen text-white p-6 rounded-lg shadow-md mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="mb-4">
            Heeft u vragen over onze {dienstTitle.toLowerCase()} diensten? Neem gerust contact met ons op.
          </p>
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>085 4444 255</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>info@refurbishtotaalnederland.nl</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-xl font-bold mb-4 text-brand-darkGreen">Andere diensten</h3>
          <ul className="space-y-3">
            {Object.entries(diensten).map(([id, d]) => (
              id !== currentServiceId && (
                <li key={id} className="hover-underline">
                  <Link to={`/diensten/${id}`} className="flex items-center text-gray-700 hover:text-brand-darkGreen">
                    <div className="text-brand-lightGreen mr-2">
                      {d.icon ? React.cloneElement(d.icon as React.ReactElement, { size: 20 }) : null}
                    </div>
                    <span>{d.title}</span>
                  </Link>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DienstSidebar;
