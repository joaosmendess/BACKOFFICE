import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Container, TextField, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { getApplications, deleteApplication } from '../../services/api';
import ItemList from '../../components/ItemList';
import { Application } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ListApplication: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setMessage('Erro ao buscar aplicações');
        setMessageType('error');
        setNotificationOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (application: Application) => {
    navigate('/aplicacao-permissao/editar', { state: { application } });
  };

  const handleOpenDialog = (application: Application) => {
    setApplicationToDelete(application);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setApplicationToDelete(null);
  };

  const handleDelete = async () => {
    if (applicationToDelete) {
      setDeleting(true);
      try {
        await deleteApplication(applicationToDelete.id);
        setApplications(applications.filter(app => app.id !== applicationToDelete.id));
        setMessage('Aplicação excluída com sucesso');
        setMessageType('success');
      } catch (error) {
        console.error('Error deleting application:', error);
        setMessage('Erro ao excluir aplicação');
        setMessageType('error');
      } finally {
        setNotificationOpen(true);
        setDialogOpen(false);
        setApplicationToDelete(null);
        setDeleting(false);
      }
    }
  };

  const filteredApplications = applications.filter(application =>
    application.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setNotificationOpen(false);
  };

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
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
          />
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ItemList items={filteredApplications} onEdit={handleEdit} onDelete={handleOpenDialog} />
        )}
      </ListContainer>
      <ConfirmDialog
        open={dialogOpen}
        title="Confirmação de exclusão"
        content="Tem certeza de que deseja excluir esta aplicação? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
        onCancel={handleCloseDialog}
        loading={deleting}
      />
      <Snackbar
        open={message !== null}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ListApplication;
