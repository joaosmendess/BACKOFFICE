import React, { useState, useRef } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Header from '../../components/Header';
import { styled } from '@stitches/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Estilos do Quill

const FormContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px', // Espaçamento entre os elementos
});

const SaveButton = styled(Button, {
  alignSelf: 'flex-start',
});

const ManageApplication: React.FC = () => {
  const [description, setDescription] = useState('');
  const quillRef = useRef<ReactQuill | null>(null);

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  return (
    <div>
      <Header />
      <FormContainer maxWidth="md">
       
        <TextField label="Nome" placeholder="Ex.: SGC" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1">Descrição</Typography>
          <ReactQuill ref={quillRef} value={description} onChange={handleDescriptionChange} />
        </Box>
        <SaveButton variant="contained" color="primary">
          Salvar
        </SaveButton>
      </FormContainer>
    </div>
  );
};

export default ManageApplication;
