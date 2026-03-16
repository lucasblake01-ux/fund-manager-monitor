import React, { useState, useEffect } from 'react';
import {
  Box, Paper, TextField, Button, Typography,
} from '@mui/material';
import { fundService } from '../../services/fund';
import { Fund, CreateFundRequest } from '../../types/fund';
import './FundForm.css';

interface FundFormProps {
  fundId?: string;
  onSave: () => void;
  onCancel: () => void;
}

export const FundForm: React.FC<FundFormProps> = ({ fundId, onSave, onCancel }) => {
  const [formData, setFormData] = useState<CreateFundRequest>({
    name: '',
    isin: '',
    description: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const isEdit = !!fundId;

  useEffect(() => {
    if (fundId) {
      loadFund();
    }
  }, [fundId]);

  const loadFund = async () => {
    try {
      const response = await fundService.getById(fundId!);
      const { name, isin, description, tags } = response.data.data;
      setFormData({
        name,
        isin: isin || '',
        description: description || '',
        tags: tags || '',
      });
    } catch (error) {
      console.error('Failed to load fund:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await fundService.update(fundId!, formData);
      } else {
        await fundService.create(formData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save fund:', error);
      alert('Failed to save fund');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="fund-form">
      <Paper className="form-paper">
        <Typography variant="h5" className="form-title">
          {isEdit ? 'Edit Fund' : 'Add Fund'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Fund Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            margin="normal"
            helperText="Full name of the fund"
          />
          <TextField
            fullWidth
            label="ISIN"
            value={formData.isin}
            onChange={(e) => setFormData({ ...formData, isin: e.target.value })}
            margin="normal"
            helperText="Optional: International Securities Identification Number"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={3}
            margin="normal"
            helperText="Brief description of the fund"
          />
          <TextField
            fullWidth
            label="Tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            margin="normal"
            helperText="Comma-separated tags (e.g., Equity, US, Large Cap)"
          />
          <Box className="form-actions">
            <Button onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
