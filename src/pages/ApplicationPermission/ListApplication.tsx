import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Container, TextField, Typography, Box, Paper, IconButton } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { Icon } from '@iconify/react/dist/iconify.js';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ApplicationItem = styled(Paper, {
  padding: '10px',
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Application {
  id: number;
  name: string;
  description: string;
}

const ListApplication: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate fetching data
  useEffect(() => {
    setApplications([
      { id: 1, name: 'SGC', description: 'Sistema de Gestão do CADOC...' },
      { id: 2, name: 'OFM', description: 'Sistema de Gestão do CADOC...' },

      // Adicione mais itens conforme necessário
    ]);
  }, []);

  const filteredApplications = applications.filter(application =>
    application.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <ListContainer maxWidth="md">
        
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
        {filteredApplications.map(application => (
          <ApplicationItem key={application.id}>
            <Box>
              <Typography variant="h6">{application.name}</Typography>
              <Typography variant="body1">{application.description}</Typography>
            </Box>
            <IconButton>
              <Icon icon="mdi:dots-vertical" />
            </IconButton>
          </ApplicationItem>
        ))}
      </ListContainer>
    </div>
  );
};

export default ListApplication;
