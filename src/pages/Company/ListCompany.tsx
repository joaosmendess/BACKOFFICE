import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Container, TextField, Typography, Box, Paper, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Menu, MenuItem } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { Icon } from '@iconify/react';
import { getCompanies } from '../../services/api';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

interface Company {
  id: number;
  name: string;
}

const ListCompany: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  //anchorEl gerencia o elemento HTML ao qual o menu está ancorado.
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //selectedCompany armazena a empresa selecionada para edição ou exclusão.
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, company: Company) => {
    setAnchorEl(event.currentTarget);
    setSelectedCompany(company);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCompany(null);
  };

  const handleEdit = () => {
    // Lógica para editar a empresa
    handleMenuClose();
  };

  const handleDelete = () => {
    // Lógica para deletar a empresa
    handleMenuClose();
  };

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
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="more-options" onClick={(e) => handleMenuClick(e, company)}>
                  <Icon icon="mdi:dots-vertical" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEdit}>Editar</MenuItem>
                  <MenuItem onClick={handleDelete}>Deletar</MenuItem>
                </Menu>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </ListContainer>
    </div>
  );
};

export default ListCompany;
