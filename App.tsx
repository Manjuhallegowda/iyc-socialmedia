import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import PublicHome from './components/PublicHome';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import JoinPage from './components/JoinPage';
import TeamPage from './components/TeamPage';
import KpyccTeamPage from './components/KpyccTeamPage';
import ActivityPage from './components/ActivityPage';
import ProfilePage from './components/ProfilePage';
import StateLeaderProfilePage from './components/StateLeaderProfilePage';
import AboutIYCPage from './components/AboutIYCPage';
import SocialMediaPage from './components/SocialMediaPage';
import LegalPage from './components/LegalPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  
  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  }, []);

  return (
    <DataProvider isAuthenticated={isAuthenticated}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<PublicHome />} />
          
          {/* New Join Page Route */}
          <Route path="/join" element={<JoinPage />} />

          {/* New Team Page Route */}
          <Route path="/team" element={<TeamPage />} />
          <Route path="/kpycc-team/:district" element={<KpyccTeamPage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
          <Route path="/legal" element={<LegalPage />} />
          
          {/* New Activity Page Route */}
          <Route path="/activities" element={<ActivityPage />} />

          {/* About IYC Page Route */}
          <Route path="/about-iyc" element={<AboutIYCPage />} />

          {/* Leader Profile Page Route */}
          <Route path="/leadership/:leaderId" element={<ProfilePage />} />

          {/* State Leader Profile Page Route */}
          <Route path="/state-leader/:leaderId" element={<StateLeaderProfilePage />} />
          
          {/* Admin Route - Protected */}
          <Route 
            path="/admin" 
            element={
              !isAuthenticated ? (
                <AdminLogin onLogin={login} />
              ) : (
                <AdminDashboard onLogout={logout} />
              )
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;

