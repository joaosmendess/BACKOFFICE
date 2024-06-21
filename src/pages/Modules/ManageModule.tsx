import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Box, CircularProgress, MenuItem } from '@mui/material';
import { styled } from '@stitches/react';
import Header from '../../components/Header';
import { getApplications, addModule, updateModule } from '../../services/api';
import SaveButton from '../../components/SaveButton';
import Notification from '../../components/Notification';
import { useLocation } from 'react-router-dom';

const FormContainer = styled(Container, {
  marginTop: '20px',
  padding: '2rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
});

const ManageModule: React.FC = () => {
  const location = useLocation();
  const moduleToEdit = location.state?.module;

  const [id, setId] = useState<string | null>(moduleToEdit?.id || null);
  const [name, setName] = useState(moduleToEdit?.name || '');
  const [applications_id, setApplicationsId] = useState<number | ''>(moduleToEdit?.applications_id || '');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [saving, setSaving] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications', error);
        setMessage('Erro ao buscar dados das aplicações');
        setSeverity('error');
        setNotificationOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleSave = async () => {
    if (!name || applications_id === '') {
      setMessage('Todos os campos são obrigatórios');
      setSeverity('error');
      setNotificationOpen(true);
      return;
    }

    setSaving(true);

    try {
      if (id) {
        await updateModule(id, { name, applications_id: Number(applications_id) });
        setMessage('Módulo atualizado com sucesso');
      } else {
        await addModule({ name, applications_id: Number(applications_id) });
        setMessage('Módulo salvo com sucesso');
      }
      setSeverity('success');
    } catch (error) {
      setMessage('Erro ao salvar o módulo');
      setSeverity('error');
    } finally {
      setSaving(false);
      setNotificationOpen(true);
    }
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <div>
      <Header />
      <FormContainer maxWidth="md">
      
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Aplicativo relacionado"
              variant="outlined"
              fullWidth
              margin="normal"
              select
              value={applications_id}
              onChange={(e) => setApplicationsId(Number(e.target.value))}
            >
              {applications.map((app: any) => (
                <MenuItem key={app.id} value={app.id}>
                  {app.name}
                </MenuItem>
              ))}
            </TextField>
            <SaveButton onClick={handleSave} saving={saving} />
          </>
        )}
        <Notification
          message={message}
          severity={severity}
          open={notificationOpen}
          onClose={handleCloseNotification}
        />
      </FormContainer>
    </div>
  );
};

export default ManageModule;
