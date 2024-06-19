import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { styled } from '@stitches/react';
import Header from '../../components/Header';
import Autocomplete from '@mui/material/Autocomplete';

const FormContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const SaveButton = styled(Button, {
  alignSelf: 'flex-start',
});

const ManageCompany: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [applications, setApplications] = useState([
    { title: 'SGC', id: 1 },
    { title: 'ERP', id: 2 },
    { title: 'CRM', id: 3 },
    // Adicione mais itens conforme necessário
  ]);

  return (
    <div>
      <Header />
      <FormContainer maxWidth="md">
        <Typography variant="h4" component="h2">
        
        </Typography>
        <TextField 
          label="Nome" 
          placeholder="Ex.: Nome da Empresa" 
          variant="outlined" 
          fullWidth 
          sx={{ marginBottom: 2 }} 
        />
        <Autocomplete
          value={selectedApp}
          onChange={(event, newValue) => setSelectedApp(newValue)}
          options={applications.map(app => app.title)}
          renderInput={(params) => <TextField {...params} label="Aplicativo relacionado" variant="outlined" />}
          sx={{ marginBottom: 2 }}
        />
        <SaveButton variant="contained" color="primary">
          Salvar
        </SaveButton>
      </FormContainer>
    </div>
  );
};

export default ManageCompany;
