import React, { useEffect, useState } from 'react';
import { Container, TextField,  Button } from '@mui/material';
import { styled } from '@stitches/react';
import { addCompany, getApplications, getUsers } from '../../services/api';
import { formatCNPJ } from '../../utils/formatCNPJ';
import Header from '../../components/Header';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ApplicationUserFields from '../../components/ApplicationsUserFields';
import SaveButton from '../../components/SaveButton';
import Notification from '../../components/Notification';

const FormContainer = styled(Container, {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const ManageCompany: React.FC = () => {
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [applications, setApplications] = useState<{ name: string; _id: string }[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<{ application: any; user: any }[]>([
    { application: null, user: null },
  ]);
  const [users, setUsers] = useState<{ name: string; _id: string }[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('success');
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingApplications(true);
      setLoadingUsers(true);

      try {
        const applicationsData = await getApplications();
        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching applications data:', error);
        setMessage('Erro ao buscar dados das aplicações');
        setSeverity('error');
        setNotificationOpen(true);
      } finally {
        setLoadingApplications(false);
      }

      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users data:', error);
        setMessage('Erro ao buscar dados dos usuários');
        setSeverity('error');
        setNotificationOpen(true);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!name || !cnpj) {
      setMessage('Os campos Nome e CNPJ são obrigatórios');
      setSeverity('error');
      setNotificationOpen(true);
      return;
    }

    setSaving(true);

    const formData = {
      name,
      cnpj,
      applications: selectedApplications.map((item) => ({
        applicationId: item.application?._id,
        userId: item.user?._id,
      })),
    };

    try {
      const response = await addCompany(formData);
      setMessage('Empresa salva com sucesso');
      setSeverity('success');
      setNotificationOpen(true);
      console.log('Data saved successfully:', response);
    } catch (error) {
      setMessage('Erro ao salvar empresa');
      setSeverity('error');
      setNotificationOpen(true);
      console.error('Error saving data:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddApplication = () => {
    setSelectedApplications([...selectedApplications, { application: null, user: null }]);
  };

  const handleRemoveApplication = (index: number) => {
    const updatedApplications = [...selectedApplications];
    updatedApplications.splice(index, 1);
    setSelectedApplications(updatedApplications);
  };

  const handleChangeApplication = (index: number, newValue: any) => {
    const updatedApplications = [...selectedApplications];
    updatedApplications[index].application = newValue;
    setSelectedApplications(updatedApplications);
  };

  const handleChangeUser = (index: number, newValue: any) => {
    const updatedApplications = [...selectedApplications];
    updatedApplications[index].user = newValue;
    setSelectedApplications(updatedApplications);
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(formatCNPJ(e.target.value));
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  return (
    <div>
      <Header />
      <FormContainer maxWidth="md">
        
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
          <ApplicationUserFields
            key={index}
            index={index}
            item={item}
            applications={applications}
            users={users}
            loadingApplications={loadingApplications}
            loadingUsers={loadingUsers}
            handleChangeApplication={handleChangeApplication}
            handleChangeUser={handleChangeUser}
            handleRemoveApplication={handleRemoveApplication}
            cnpj={cnpj}
            handleCnpjChange={handleCnpjChange}
          />
        ))}
        <Button
          startIcon={<AddCircleIcon />}
          onClick={handleAddApplication}
          sx={{ alignSelf: 'flex-start', marginTop: 2 }}
        >
          Adicionar Aplicação
        </Button>
        <br />
        <SaveButton onClick={handleSave} saving={saving} />
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

export default ManageCompany;
