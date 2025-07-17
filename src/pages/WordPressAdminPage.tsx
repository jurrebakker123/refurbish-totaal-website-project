import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WordPressAdminLayout from '@/components/wp-admin/WordPressAdminLayout';
import WordPressAdminDashboard from '@/components/wp-admin/WordPressAdminDashboard';
import WordPressContentManager from '@/components/wp-admin/WordPressContentManager';
import WordPressPriceManager from '@/components/wp-admin/WordPressPriceManager';
import WordPressMediaLibrary from '@/components/wp-admin/WordPressMediaLibrary';
import WordPressUserManager from '@/components/wp-admin/WordPressUserManager';
import WordPressFormBuilder from '@/components/wp-admin/WordPressFormBuilder';
import WordPressThemeCustomizer from '@/components/wp-admin/WordPressThemeCustomizer';
import WordPressAnalytics from '@/components/wp-admin/WordPressAnalytics';
import WordPressSettings from '@/components/wp-admin/WordPressSettings';

const WordPressAdminPage = () => {
  return (
    <WordPressAdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/wp-admin/dashboard" replace />} />
        <Route path="/dashboard" element={<WordPressAdminDashboard />} />
        <Route path="/content" element={<WordPressContentManager />} />
        <Route path="/content/:type" element={<WordPressContentManager />} />
        <Route path="/content/:type/:id" element={<WordPressContentManager />} />
        <Route path="/prices" element={<WordPressPriceManager />} />
        <Route path="/media" element={<WordPressMediaLibrary />} />
        <Route path="/users" element={<WordPressUserManager />} />
        <Route path="/forms" element={<WordPressFormBuilder />} />
        <Route path="/appearance" element={<WordPressThemeCustomizer />} />
        <Route path="/analytics" element={<WordPressAnalytics />} />
        <Route path="/settings" element={<WordPressSettings />} />
      </Routes>
    </WordPressAdminLayout>
  );
};

export default WordPressAdminPage;