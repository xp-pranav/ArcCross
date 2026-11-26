import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/navigation/AppShell';
import { LandingPage } from './pages/landing';
import { DevicesPage, TransfersPage, SettingsPage, WelcomePage } from './pages/app';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Core Desktop Application Routes */}
          <Route
            path="/app"
            element={
              <AppShell>
                <DevicesPage />
              </AppShell>
            }
          />
          <Route
            path="/app/devices"
            element={
              <AppShell>
                <DevicesPage />
              </AppShell>
            }
          />
          <Route
            path="/app/transfers"
            element={
              <AppShell>
                <TransfersPage />
              </AppShell>
            }
          />
          <Route
            path="/app/settings"
            element={
              <AppShell>
                <SettingsPage />
              </AppShell>
            }
          />
          <Route
            path="/app/welcome"
            element={
              <AppShell>
                <WelcomePage />
              </AppShell>
            }
          />

          {/* Backwards-compatibility redirects for direct sub-paths */}
          <Route path="/transfers" element={<Navigate to="/app/transfers" replace />} />
          <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
          <Route path="/welcome" element={<Navigate to="/app/welcome" replace />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
