import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Header } from './components/Header';
import { TopNavbar } from './components/TopNavbar';
import { SideMenu } from './components/SideMenu';
import { Dashboard } from './components/Dashboard';
import { FundList, FundForm } from './components/Funds';
import { ChangesFeed } from './components/ChangesFeed';
import { Settings } from './components/Settings';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedFundId, setSelectedFundId] = useState<string | null>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedFundId(null);
  };

  const handleSelectFund = (id: string) => {
    setSelectedFundId(id);
    setCurrentView('fund-form');
  };

  const handleAddNewFund = () => {
    setSelectedFundId(null);
    setCurrentView('fund-form');
  };

  const handleFundSave = () => {
    setCurrentView('funds');
    setSelectedFundId(null);
  };

  return (
    <>
      <CssBaseline />
      <Box className="app-container">
        <Header />
        <TopNavbar onNavigate={handleNavigate} currentView={currentView} />
        <Box className="app-layout">
          <SideMenu onNavigate={handleNavigate} currentView={currentView} />
          <Box component="main" className="main-content">
            {currentView === 'dashboard' && (
              <Dashboard onNavigate={handleNavigate} />
            )}
            {currentView === 'funds' && (
              <FundList
                onSelect={handleSelectFund}
                onAddNew={handleAddNewFund}
              />
            )}
            {currentView === 'fund-form' && (
              <FundForm
                fundId={selectedFundId || undefined}
                onSave={handleFundSave}
                onCancel={() => setCurrentView('funds')}
              />
            )}
            {currentView === 'changes' && <ChangesFeed />}
            {currentView === 'settings' && <Settings />}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
