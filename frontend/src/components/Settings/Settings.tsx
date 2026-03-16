import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button, Divider, Alert,
} from '@mui/material';
import { Email, Notifications } from '@mui/icons-material';
import { userService } from '../../services/user';
import './Settings.css';

export const Settings: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter an email address' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await userService.subscribe({ email });
      setMessage({
        type: 'success',
        text: 'Successfully subscribed to email notifications!',
      });
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to subscribe. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter an email address' });
      return;
    }

    if (!window.confirm(`Unsubscribe ${email} from notifications?`)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await userService.unsubscribe({ email });
      setMessage({
        type: 'success',
        text: 'Successfully unsubscribed from email notifications.',
      });
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to unsubscribe. Email may not be registered.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="settings">
      <Typography variant="h5" className="settings-title">
        Settings
      </Typography>

      <Paper className="settings-section">
        <Box className="section-header">
          <Notifications />
          <Typography variant="h6">Email Notifications</Typography>
        </Box>
        <Divider style={{ margin: '16px 0' }} />

        <Typography variant="body2" color="text.secondary" paragraph>
          Subscribe to receive email notifications when portfolio manager changes are detected.
        </Typography>

        {message && (
          <Alert severity={message.type} style={{ marginBottom: 16 }}>
            {message.text}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          slotProps={{
            input: {
              startAdornment: <Email style={{ marginRight: 8, color: '#666' }} />,
            },
          }}
        />

        <Box className="settings-actions">
          <Button
            variant="contained"
            onClick={handleSubscribe}
            disabled={loading || !email}
          >
            {loading ? 'Processing...' : 'Subscribe'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleUnsubscribe}
            disabled={loading || !email}
          >
            Unsubscribe
          </Button>
        </Box>
      </Paper>

      <Paper className="settings-section">
        <Box className="section-header">
          <Typography variant="h6">About Email Notifications</Typography>
        </Box>
        <Divider style={{ margin: '16px 0' }} />

        <Typography variant="body2" paragraph>
          <strong>How it works:</strong>
        </Typography>
        <Typography variant="body2" component="ul" style={{ paddingLeft: 20 }}>
          <li>Daily scraping runs automatically every morning at 8:00 AM</li>
          <li>You'll receive an email when new manager changes are detected</li>
          <li>Emails include fund name, manager name, and change type</li>
          <li>You can unsubscribe at any time</li>
        </Typography>

        <Typography variant="body2" color="text.secondary" style={{ marginTop: 16 }}>
          <strong>Note:</strong> Email notifications are currently in stub mode for the prototype.
          Configure SMTP settings in the backend to enable actual email delivery.
        </Typography>
      </Paper>
    </Box>
  );
};
