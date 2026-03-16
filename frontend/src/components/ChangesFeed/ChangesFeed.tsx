import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Card, CardContent, Chip, IconButton, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import { Refresh, TrendingUp, TrendingDown, SwapHoriz, OpenInNew } from '@mui/icons-material';
import { changeService } from '../../services/change';
import { ChangeWithFund } from '../../types/change';
import './ChangesFeed.css';

export const ChangesFeed: React.FC = () => {
  const [changes, setChanges] = useState<ChangeWithFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [daysFilter, setDaysFilter] = useState<number>(30);

  useEffect(() => {
    loadData();
  }, [daysFilter]);

  const loadData = async () => {
    try {
      const response = await changeService.getRecent(daysFilter);
      setChanges(response.data.data);
    } catch (error) {
      console.error('Failed to load changes:', error);
    } finally {
      setLoading(false);
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'MANAGER_JOINED':
        return <TrendingUp color="success" />;
      case 'MANAGER_LEFT':
        return <TrendingDown color="error" />;
      case 'MANAGER_CHANGED':
        return <SwapHoriz color="warning" />;
      default:
        return <SwapHoriz />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'MANAGER_JOINED':
        return 'success';
      case 'MANAGER_LEFT':
        return 'error';
      case 'MANAGER_CHANGED':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getChangeLabel = (type: string) => {
    return type.replace('MANAGER_', '').replace('_', ' ');
  };

  const filteredChanges = changes.filter((change) => {
    if (filter === 'all') return true;
    return change.change_type === filter;
  });

  if (loading) {
    return <Box className="loading">Loading changes...</Box>;
  }

  return (
    <Box className="changes-feed">
      <Box className="feed-header">
        <Typography variant="h5">Changes Feed</Typography>
        <Box className="feed-filters">
          <FormControl size="small" style={{ minWidth: 150 }}>
            <InputLabel>Days</InputLabel>
            <Select
              value={daysFilter}
              label="Days"
              onChange={(e) => setDaysFilter(Number(e.target.value))}
            >
              <MenuItem value={7}>Last 7 days</MenuItem>
              <MenuItem value={30}>Last 30 days</MenuItem>
              <MenuItem value={90}>Last 90 days</MenuItem>
              <MenuItem value={365}>Last year</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select value={filter} label="Type" onChange={(e) => setFilter(e.target.value)}>
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="MANAGER_JOINED">Joined</MenuItem>
              <MenuItem value="MANAGER_LEFT">Left</MenuItem>
              <MenuItem value="MANAGER_CHANGED">Changed</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={loadData}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Box className="feed-content">
        {filteredChanges.length === 0 ? (
          <Paper className="no-changes">
            <Typography variant="body1" color="text.secondary">
              No changes detected in the selected time period.
            </Typography>
          </Paper>
        ) : (
          filteredChanges.map((change) => (
            <Card key={change.id} className="change-card">
              <CardContent>
                <Box className="change-header">
                  <Box className="change-icon">{getChangeIcon(change.change_type)}</Box>
                  <Box className="change-info">
                    <Typography variant="h6" className="change-fund">
                      {change.fund_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(change.detected_date).toLocaleString()}
                    </Typography>
                  </Box>
                  <Chip
                    label={getChangeLabel(change.change_type)}
                    color={getChangeColor(change.change_type) as any}
                    size="small"
                  />
                </Box>

                <Box className="change-details">
                  <Typography variant="body1">
                    <strong>Manager:</strong> {change.manager_name}
                  </Typography>
                  {change.previous_manager && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Previous:</strong> {change.previous_manager}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    <strong>Source:</strong> {change.source_name}
                  </Typography>
                  {change.source_url && (
                    <Box className="change-source">
                      <a href={change.source_url} target="_blank" rel="noopener noreferrer">
                        View Source <OpenInNew fontSize="small" />
                      </a>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};
