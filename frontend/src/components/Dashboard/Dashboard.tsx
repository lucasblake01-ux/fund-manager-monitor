import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { PlayArrow, Refresh, TrendingUp, Folder, Notifications } from '@mui/icons-material';
import { fundService } from '../../services/fund';
import { changeService } from '../../services/change';
import { scrapingService } from '../../services/scraping';
import { ScrapingStatus } from '../../types/scraping';
import './Dashboard.css';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [fundCount, setFundCount] = useState(0);
  const [recentChanges, setRecentChanges] = useState(0);
  const [scrapingStatus, setScrapingStatus] = useState<ScrapingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [fundsResp, changesResp, statusResp] = await Promise.all([
        fundService.getStatistics(),
        changeService.getStatistics(),
        scrapingService.getStatus(),
      ]);

      setFundCount(fundsResp.data.data.total_funds);
      setRecentChanges(changesResp.data.data.recent_changes_30d);
      setScrapingStatus(statusResp.data.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunScraping = async () => {
    try {
      await scrapingService.trigger({ manual: true });
      setTimeout(loadData, 1000); // Reload after a short delay
    } catch (error) {
      console.error('Failed to trigger scraping:', error);
      alert('Failed to start scraping. It may already be running.');
    }
  };

  if (loading) {
    return (
      <Box className="dashboard loading-container">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="dashboard">
      <Box className="dashboard-header">
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={handleRunScraping}
          disabled={scrapingStatus?.is_running}
        >
          {scrapingStatus?.is_running ? 'Scraping...' : 'Run Scraping'}
        </Button>
      </Box>

      <Box className="dashboard-stats">
        <Card className="stat-card" onClick={() => onNavigate('funds')} sx={{ cursor: 'pointer' }}>
          <CardContent>
            <Box className="stat-icon">
              <Folder fontSize="large" />
            </Box>
            <Typography variant="h3">{fundCount}</Typography>
            <Typography variant="body2" color="text.secondary">
              Total Funds
            </Typography>
          </CardContent>
        </Card>

        <Card className="stat-card" onClick={() => onNavigate('changes')} sx={{ cursor: 'pointer' }}>
          <CardContent>
            <Box className="stat-icon">
              <TrendingUp fontSize="large" />
            </Box>
            <Typography variant="h3">{recentChanges}</Typography>
            <Typography variant="body2" color="text.secondary">
              Changes (30 Days)
            </Typography>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent>
            <Box className="stat-icon">
              <Notifications fontSize="large" />
            </Box>
            <Typography variant="h3">
              {scrapingStatus?.is_running ? 'Running' : 'Ready'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Scraper Status
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Paper className="dashboard-info">
        <Typography variant="h6" gutterBottom>
          Welcome to Fund Manager Monitor
        </Typography>
        <Typography variant="body1" paragraph>
          This application monitors portfolio manager changes across {fundCount} funds from multiple sources.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {scrapingStatus?.last_run ? (
            `Last scraping run: ${new Date(scrapingStatus.last_run).toLocaleString()}`
          ) : (
            'No scraping runs yet. Click "Run Scraping" to start monitoring.'
          )}
        </Typography>
      </Paper>
    </Box>
  );
};
