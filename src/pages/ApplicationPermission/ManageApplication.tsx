import React, { useState, useRef, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Header from '../../components/Header';
import { styled } from '@stitches/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Estilos do Quill
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { green } from '@mui/material/colors';

const FormContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px', // Espaçamento entre os elementos
});

const SaveButton = styled(Button, {
  alignSelf: 'flex-start',
});

const ErrorMessage = styled('div', {
  color: 'red',
  marginBottom: '20px',
});

const MAX_DESCRIPTION_LENGTH = 255;

const ManageApplication: React.FC = () => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [developUrl, setDevelopUrl] = useState('');
  const [homologUrl, setHomologUrl] = useState('');
  const [productionUrl, setProductionUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const quillRef = useRef<ReactQuill | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.application) {
      const app = location.state.application;
      setId(app.id);
      setName(app.name);
      setDescription(app.description);
      setDevelopUrl(app.developUrl);
      setHomologUrl(app.homologUrl);
      setProductionUrl(app.productionUrl);
    }
  }, [location.state]);

  const checkNameExists = async (name: string) => {
    try {
      const response = await axios.get('http://localhost:8989/api/applications');
      return response.data.some((application: any) => application.name === name && application.id !== id);
    } catch (error) {
      console.error('Error checking name:', error);
      return false;
    }
  };

  const handleSave = async () => {
    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!name || !description || !developUrl || !homologUrl || !productionUrl) {
      setError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    // Verificar se o nome já está em uso
    const nameExists = await checkNameExists(name);
    if (nameExists) {
      setError(`O nome ${name} já está em uso`);
      return;
    }

    setLoading(true);
    setError('');

    const formData = {
      name,
      description,
      developUrl,
      homologUrl,
      productionUrl,
    };

    console.log('Enviando dados:', formData); // Log dos dados enviados

    const request = id
      ? axios.put(`http://localhost:8989/api/applications/${id}`, formData)
      : axios.post('http://localhost:8989/api/applications', formData);

    request
      .then((response) => {
        console.log('Data saved successfully:', response.data);
        setLoading(false);
        setDialogOpen(true);
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
      });
  };

  const handleError = (error: any) => {
    if (error.response) {
      // Erros vindos do servidor
      setError(`Erro: ${error.response.data.message || error.message}`);
    } else {
      // Outros erros
      setError(`Erro: ${error.message}`);
    }
    console.error('Error saving data:', error);
  };

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleDescriptionChange = (value: string) => {
    const textContent = stripHtmlTags(value);
    if (textContent.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(value);
    } else if (textContent.length > MAX_DESCRIPTION_LENGTH) {
      setDescription((prevDescription) => {
        const strippedPrevDescription = stripHtmlTags(prevDescription);
        if (strippedPrevDescription.length >= MAX_DESCRIPTION_LENGTH) {
          return prevDescription;
        }
        return value;
      });
    }
  };

  const descriptionLength = stripHtmlTags(description).length;

  return (
    <div>
      <Header />
      <FormContainer maxWidth="md">
        <Typography variant="h4" component="h2">
          Gerenciar aplicação para permissão
        </Typography>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <TextField
          label="Nome"
          placeholder="Ex.: SGC"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ marginBottom: 2 }}>
          <ReactQuill
            ref={quillRef}
            placeholder="Descrição (máximo de 255 caracteres)"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Typography
            variant="caption"
            sx={{ color: descriptionLength > MAX_DESCRIPTION_LENGTH ? 'red' : 'inherit' }}
          >
            {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
          </Typography>
        </Box>
        <TextField
          placeholder=''
          aria-label="URL de desenvolvimento"
          label="URL de desenvolvimento"
          variant="outlined"
          fullWidth
          required
          value={developUrl}
          onChange={(e) => setDevelopUrl(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          placeholder=''
          aria-label="URL de homologação"
          label="URL de homologação"
          variant="outlined"
          fullWidth
          required
          value={homologUrl}
          onChange={(e) => setHomologUrl(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          placeholder=''
          aria-label="URL de produção"
          label="URL de produção"
          variant="outlined"
          fullWidth
          required
          value={productionUrl}
          onChange={(e) => setProductionUrl(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <SaveButton
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Salvar'}
        </SaveButton>
      </FormContainer>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle color={green}>Operação concluída</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A aplicação foi {id ? 'editada' : 'salva'} com sucesso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/aplicacao-permissao/lista')}>Ver na listagem</Button>
          <Button onClick={() => setDialogOpen(false)}>Continuar na página</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageApplication;
