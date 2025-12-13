import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import PublicHome from './components/PublicHome';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import JoinPage from './components/JoinPage';
import TeamPage from './components/TeamPage'; // Import the new TeamPage component
import ActivityPage from './components/ActivityPage';

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
          
          {/* New Activity Page Route */}
          <Route path="/activities" element={<ActivityPage />} />
          
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