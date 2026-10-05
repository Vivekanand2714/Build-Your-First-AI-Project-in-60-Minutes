import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GrowthProvider } from './context/GrowthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoControlsModal } from './components/DemoControlsModal';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { SuccessPage } from './pages/SuccessPage';
import { DashboardPage } from './pages/DashboardPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AdminPage } from './pages/AdminPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { CampusChallengePage } from './pages/CampusChallengePage';
import { WhatsAppFlowPage } from './pages/WhatsAppFlowPage';
import { WorkshopPage } from './pages/WorkshopPage';

import { PresentationPage } from './pages/PresentationPage';
import { useLocation } from 'react-router-dom';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isPresentation = location.pathname === '/presentation';

  if (isPresentation) {
    return (
      <Routes>
        <Route path="/presentation" element={<PresentationPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans relative">
      {/* Main Navigation Bar */}
      <Navbar />

      {/* Page Routing */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/campus-challenge" element={<CampusChallengePage />} />
          <Route path="/whatsapp-flow" element={<WhatsAppFlowPage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="/presentation" element={<PresentationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Discreet Demo Controls Modal trigger for 3-minute video presentation */}
      <DemoControlsModal />

      {/* Footer with Compliance & Quick Links */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GrowthProvider>
      <Router>
        <AppContent />
      </Router>
    </GrowthProvider>
  );
};

export default App;
