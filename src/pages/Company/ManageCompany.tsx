// src/pages/ManageCompany/index.tsx
import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Autocomplete, Box, IconButton, Grid } from '@mui/material';
import { styled } from '@stitches/react';
import axios from 'axios';
import Header from '../../components/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
  const [name, setName] = useState('');
  const [applications, setApplications] = useState<{ name: string; _id: string }[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<{ application: any; user: any }[]>([
    { application: null, user: null },
  ]);
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);

  useEffect(() => {
    // Fetch applications data
    axios
      .get('http://localhost:8989/api/permission-applications')
      .then((response) => setApplications(response.data))
      .catch((error) => console.error('Error fetching applications data:', error));

    // Fetch users data
    axios
      .get('http://localhost:8989/api/sso-users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users data:', error));
  }, []);

  const handleSave = () => {
    const formData = {
      name,
      applications: selectedApplications.map((item) => ({
        applicationId: item.application?._id,
        userId: item.user?._id,
      })),
    };

    axios
      .post('http://localhost:8989/api/companies', formData)
      .then((response) => {
        console.log('Data saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

  const handleAddApplication = () => {
    setSelectedApplications([...selectedApplications, { application: null, user: null }]);
  };

  const handleRemoveApplication = (index: number) => {
    const updatedApplications = [...selectedApplications];
    updatedApplications.splice(index, 1);
    setSelectedApplications(updatedApplications);
  };

  return (
    <div>
      <Header />
      <FormContainer maxWidth="md">
        <Typography variant="h4" component="h2">
          Gerenciar empresa
        </Typography>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Nome da Empresa"
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        {selectedApplications.map((item, index) => (
          <Grid container key={index} spacing={2} alignItems="center"           sx={{ marginBottom: 2 }}
>
            <Grid item xs={12} sm={5}>
              <Autocomplete
              
                value={item.application}
                onChange={(event, newValue) => {
                  const updatedApplications = [...selectedApplications];
                  updatedApplications[index].application = newValue;
                  setSelectedApplications(updatedApplications);
                }}
                options={applications}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Aplicação para permissão" variant="outlined" />}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}     
            >
              <Autocomplete 
              
                value={item.user}
                onChange={(event, newValue) => {
                  const updatedApplications = [...selectedApplications];
                  updatedApplications[index].user = newValue;
                  setSelectedApplications(updatedApplications);
                }}
                options={users}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Super usuário" variant="outlined" />}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <IconButton color="error" onClick={() => handleRemoveApplication(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          startIcon={<AddCircleIcon />}
          onClick={handleAddApplication}
          sx={{ alignSelf: 'flex-start', marginTop: 2 }}
        >
          Adicionar Aplicação
        </Button>
        <SaveButton variant="contained" color="primary" onClick={handleSave}>
          Salvar
        </SaveButton>
      </FormContainer>
    </div>
  );
};

export default ManageCompany;
