import React, { useState } from 'react';
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Menu as MenuIcon, ChevronRight, ExpandMore, Dashboard, FolderOpen, Feed, Settings } from '@mui/icons-material';
import './SideMenu.css';

interface SideMenuProps {
  onNavigate: (view: string) => void;
  currentView: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({ onNavigate, currentView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleExpanded = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };

  const menuItems = [
    { icon: <Dashboard />, label: 'Dashboard', view: 'dashboard' },
    { icon: <FolderOpen />, label: 'Funds', view: 'funds' },
    { icon: <Feed />, label: 'Changes Feed', view: 'changes' },
    { icon: <Settings />, label: 'Settings', view: 'settings' },
  ];

  return (
    <Box className={`sidemenu ${isCollapsed ? 'collapsed' : ''}`}>
      <Box className="sidemenu-toggle">
        <IconButton onClick={toggleCollapse} size="small">
          <MenuIcon />
        </IconButton>
      </Box>
      <List className="sidemenu-list">
        {menuItems.map((item) => (
          <React.Fragment key={item.view}>
            <ListItemButton
              className={`sidemenu-item ${currentView === item.view ? 'active' : ''}`}
              onClick={() => onNavigate(item.view)}
            >
              <ListItemIcon className="sidemenu-icon">{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
