import React from 'react';
import { Box, Button } from '@mui/material';
import { Home, FolderOpen, Feed, Settings } from '@mui/icons-material';
import './TopNavbar.css';

interface TopNavbarProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onNavigate, currentView }) => {
  const navItems = [
    { icon: <Home />, label: 'Dashboard', view: 'dashboard' },
    { icon: <FolderOpen />, label: 'Funds', view: 'funds' },
    { icon: <Feed />, label: 'Changes Feed', view: 'changes' },
    { icon: <Settings />, label: 'Settings', view: 'settings' },
  ];

  return (
    <Box className="topnav">
      <Box className="topnav-items">
        {navItems.map((item) => (
          <Button
            key={item.view}
            className={`topnav-button ${currentView === item.view ? 'active' : ''}`}
            startIcon={item.icon}
            onClick={() => onNavigate(item.view)}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
