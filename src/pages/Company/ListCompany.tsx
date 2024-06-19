import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Container, TextField, Typography, Box, Paper, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { Icon } from '@iconify/react';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

const CompanyItem = styled(Paper, {
  padding: '10px',
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Company {
  id: number;
  name: string;
  address: string;
  contact: string;
}

const ListCompany: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate fetching data
  useEffect(() => {
    setCompanies([
      { id: 1, name: 'Company A', address: '123 Main St', contact: 'contact@companya.com' },
      { id: 2, name: 'Company B', address: '456 Elm St', contact: 'contact@companyb.com' },
      { id: 3, name: 'Company C', address: '789 Oak St', contact: 'contact@companyc.com' },
      // Adicione mais itens conforme necessário
    ]);
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <ListContainer maxWidth="md">
        <Typography variant="h4" component="h2">
          Lista de Empresas
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <List>
          {filteredCompanies.map(company => (
            <ListItem key={company.id} component={Paper} sx={{ marginBottom: 2 }}>
              <ListItemText
                primary={company.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {company.address}
                    </Typography>
                    <br />
                    {company.contact}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="more-options">
                  <Icon icon="mdi:dots-vertical" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </ListContainer>
    </div>
  );
};

export default ListCompany;
