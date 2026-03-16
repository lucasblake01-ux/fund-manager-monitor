import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AboutDialog: React.FC<AboutDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>About Fund Manager Monitor</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1" paragraph>
            <strong>Version:</strong> 1.0.0
          </Typography>
          <Typography variant="body1" paragraph>
            Fund Manager Monitor is an automated system that tracks portfolio manager changes
            across multiple funds and sources, including Citywire, company websites, and Google searches.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This application monitors fund manager changes daily and provides instant notifications
            when changes are detected.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
