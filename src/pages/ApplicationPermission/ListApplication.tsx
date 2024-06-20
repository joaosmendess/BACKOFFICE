import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Container, TextField, Typography, Box, Paper, IconButton, CircularProgress, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ApplicationItem = styled(Paper, {
  padding: '10px',
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface Application {
  id: number;
  name: string;
  description: string;
  developUrl: string;
  homologUrl: string;
  productionUrl: string;
}

const ListApplication: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8989/api/applications')
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
        setLoading(false);
      });
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, application: Application) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplication(application);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (selectedApplication) {
      navigate('/aplicacao-permissao/editar', { state: { application: selectedApplication } });
    }
    handleMenuClose();
  };

  const handleDeleteOpen = () => {
    if (selectedApplication) {
      setConfirmDeleteOpen(true);
    } else {
      console.error('No application selected for deletion');
    }
    handleMenuClose();
  };

  const handleDeleteClose = () => {
    setConfirmDeleteOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedApplication) {
      setDeleting(true);
      axios.delete(`http://localhost:8989/api/applications/${selectedApplication.id}`)
        .then(() => {
          setApplications(applications.filter(app => app.id !== selectedApplication.id));
          setDeleting(false);
          setSuccessSnackbarOpen(true);
          handleDeleteClose();
        })
        .catch((error) => {
          console.error('Error deleting application:', error);
          setDeleting(false);
        });
    } else {
      console.error('No application selected for deletion');
    }
  };

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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          filteredApplications.map(application => (
            <ApplicationItem key={application.id}>
              <Box>
                <Typography variant="h6">{application.name}</Typography>
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: application.description }} />
              </Box>
              <IconButton aria-label="menu" onClick={(event) => handleMenuOpen(event, application)}>
                <Icon icon="mdi:dots-vertical" />
              </IconButton>
            </ApplicationItem>
          ))
        )}
      </ListContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit} aria-label='editar'>Editar</MenuItem>
        <MenuItem onClick={handleDeleteOpen} aria-label='delete'>Excluir</MenuItem>
      </Menu>
      <Dialog
        open={confirmDeleteOpen}
        onClose={handleDeleteClose}
      >
        <DialogTitle>Confirmação de exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir esta aplicação? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="error" disabled={deleting}>
            Não
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" aria-label='confirm-delete' disabled={deleting}>
            {deleting ? <CircularProgress size={24} /> : 'Sim'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <Alert onClose={() => setSuccessSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Aplicação excluída com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ListApplication;
