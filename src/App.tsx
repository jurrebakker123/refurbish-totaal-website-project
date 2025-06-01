import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DakkapelCalculator from './components/DakkapelCalculator';
import Home from './pages/Home';
import Bouwhulp from './pages/Bouwhulp';
import Contact from './pages/Contact';
import OfferteAanvragen from './pages/OfferteAanvragen';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute';
import AdminZonnepanelenPage from './pages/AdminZonnepanelenPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dakkapel-calculator" element={<DakkapelCalculator />} />
        <Route path="/bouwhulp" element={<Bouwhulp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/offerte-aanvragen" element={<OfferteAanvragen />} />
        
        <Route path="/admin-dashboard" element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        } />
        
        <Route path="/zonnepanelen-admin" element={
          <ProtectedAdminRoute>
            <AdminZonnepanelenPage />
          </ProtectedAdminRoute>
        } />
        
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
