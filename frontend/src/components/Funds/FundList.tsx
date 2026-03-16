import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Typography, IconButton, TextField, Chip,
} from '@mui/material';
import { Add, Edit, Delete, Search, Upload } from '@mui/icons-material';
import { fundService } from '../../services/fund';
import { Fund } from '../../types/fund';
import './FundList.css';

interface FundListProps {
  onSelect: (id: string) => void;
  onAddNew: () => void;
}

export const FundList: React.FC<FundListProps> = ({ onSelect, onAddNew }) => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (search?: string) => {
    try {
      const response = await fundService.getAll(search);
      setFunds(response.data.data);
    } catch (error) {
      console.error('Failed to load funds:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadData(searchQuery);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete fund "${name}"?`)) {
      try {
        await fundService.delete(id);
        loadData(searchQuery);
      } catch (error) {
        console.error('Failed to delete fund:', error);
        alert('Failed to delete fund');
      }
    }
  };

  if (loading) {
    return <Box className="loading">Loading funds...</Box>;
  }

  return (
    <Box className="fund-list">
      <Box className="list-header">
        <Typography variant="h5">Funds ({funds.length})</Typography>
        <Box className="list-actions">
          <TextField
            size="small"
            placeholder="Search funds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton size="small" onClick={handleSearch}>
                    <Search />
                  </IconButton>
                ),
              },
            }}
          />
          <Button variant="contained" startIcon={<Add />} onClick={onAddNew}>
            Add Fund
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ISIN</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No funds found. Add your first fund to start monitoring.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              funds.map((fund) => (
                <TableRow
                  key={fund.id}
                  hover
                  onClick={() => onSelect(fund.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <strong>{fund.name}</strong>
                  </TableCell>
                  <TableCell>{fund.isin || '-'}</TableCell>
                  <TableCell>{fund.description || '-'}</TableCell>
                  <TableCell>
                    {fund.tags ? (
                      fund.tags.split(',').map((tag, idx) => (
                        <Chip key={idx} label={tag.trim()} size="small" style={{ marginRight: 4 }} />
                      ))
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{new Date(fund.created_at).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(fund.id);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(fund.id, fund.name);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
