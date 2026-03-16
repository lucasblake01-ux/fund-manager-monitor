import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { AccountCircle, Info } from '@mui/icons-material';
import { AboutDialog } from './AboutDialog';
import './Header.css';

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAboutClick = () => {
    setAboutOpen(true);
    handleMenuClose();
  };

  return (
    <>
      <Box className="header">
        <Box className="header-left">
          <Box className="header-logo">
            <Typography variant="h6" className="header-logo-text">
              NB
            </Typography>
          </Box>
          <Typography variant="h6" className="header-title">
            Fund Manager Monitor
          </Typography>
        </Box>
        <Box className="header-right">
          <IconButton
            onClick={handleMenuOpen}
            className="header-user-button"
            aria-label="user menu"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="header-user-menu"
          >
            <MenuItem onClick={handleAboutClick}>
              <Info fontSize="small" style={{ marginRight: 8 }} />
              About
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
};
