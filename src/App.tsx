import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MarketplacePage from './pages/MarketplacePage';
import KlusPlaasten from './pages/KlusPlaasten';
import MarketplaceAuthPage from './pages/MarketplaceAuthPage';
import VakmanRegistrationPage from './pages/VakmanRegistrationPage';
import VakmanDashboardPage from './pages/VakmanDashboardPage';
import VakmanProfielPage from './pages/VakmanProfielPage';
import VakmanWerkgebiedPage from './pages/VakmanWerkgebiedPage';

import KlantDashboardPage from './pages/KlantDashboardPage';
import VakmanOfferteaanvragenPage from './pages/VakmanOfferteaanvragenPage';
import VakmanOffertePage from './pages/VakmanOffertePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          
          {/* Marketplace Routes */}
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/login" element={<MarketplaceAuthPage />} />
          <Route path="/marketplace/klus-plaasten" element={<KlusPlaasten />} />
          <Route path="/marketplace/vakman-registratie" element={<VakmanRegistrationPage />} />
          
          {/* Dashboard Routes */}
          <Route path="/marketplace/klant-dashboard" element={<KlantDashboardPage />} />
          <Route path="/marketplace/vakman-dashboard" element={<VakmanDashboardPage />} />
          <Route path="/marketplace/vakman-dashboard/offerteaanvragen" element={<VakmanOfferteaanvragenPage />} />
          <Route path="/marketplace/vakman-dashboard/bedrijfsprofiel" element={<VakmanProfielPage />} />
          <Route path="/marketplace/vakman-dashboard/werkgebied" element={<VakmanWerkgebiedPage />} />
          <Route path="/marketplace/vakman-offerte/:klusId" element={<VakmanOffertePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
