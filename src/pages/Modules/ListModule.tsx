import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Container, TextField, Box, CircularProgress, Button } from '@mui/material';
import { styled } from '@stitches/react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { getModules, deleteModule } from '../../services/api';
import Papa from 'papaparse';
import ItemList from '../../components/ItemList';
import { Module } from '../../types';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';

const ListContainer = styled(Container, {
  marginTop: '20px',
});

const ModuleList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getModules();
        setModules(data);
      } catch (error) {
        console.error('Error fetching modules:', error);
        setMessage('Erro ao buscar módulos');
        setSeverity('error');
        setNotificationOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (module: Module) => {
    navigate('/modulos/editar', { state: { module } });
  };

  const handleOpenDialog = (module: Module) => {
    setModuleToDelete(module);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setModuleToDelete(null);
  };

  const handleDelete = async () => {
    if (moduleToDelete) {
      setDeleting(true);
      try {
        await deleteModule(moduleToDelete.id);
        setModules(modules.filter(mod => mod.id !== moduleToDelete.id));
        setMessage('Módulo excluído com sucesso');
        setSeverity('success');
      } catch (error) {
        console.error('Error deleting module:', error);
        setMessage('Erro ao excluir módulo');
        setSeverity('error');
      } finally {
        setNotificationOpen(true);
        setDialogOpen(false);
        setModuleToDelete(null);
        setDeleting(false);
      }
    }
  };

  const handleExportToCSV = () => {
    const csv = Papa.unparse(modules);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'modules.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <ItemList items={filteredModules} onEdit={handleEdit} onDelete={handleOpenDialog} />
        )}
        <Button variant="contained" color="primary" onClick={handleExportToCSV} disabled={modules.length === 0} sx={{ marginTop: 2 }}>
          Exportar para CSV
        </Button>
      </ListContainer>
      <ConfirmDialog
        open={dialogOpen}
        title="Confirmação de exclusão"
        content="Tem certeza de que deseja excluir este módulo? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
        onCancel={handleCloseDialog}
        loading={deleting}
      />
      <Notification
        message={message}
        severity={severity}
        open={notificationOpen}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default ModuleList;
