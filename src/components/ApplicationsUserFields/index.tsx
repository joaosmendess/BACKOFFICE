// src/components/ApplicationUserFields.tsx
import React from 'react';
import { Grid, TextField, IconButton, Autocomplete, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ApplicationUserFieldsProps {
  index: number;
  item: { application: any; user: any };
  applications: { name: string; _id: string }[];
  users: { name: string; _id: string }[];
  loadingApplications: boolean;
  loadingUsers: boolean;
  handleChangeApplication: (index: number, newValue: any) => void;
  handleChangeUser: (index: number, newValue: any) => void;
  handleRemoveApplication: (index: number) => void;
  cnpj: string;
  handleCnpjChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApplicationUserFields: React.FC<ApplicationUserFieldsProps> = ({
  index,
  item,
  applications,
  users,
  loadingApplications,
  loadingUsers,
  handleChangeApplication,
  handleChangeUser,
  handleRemoveApplication,
  cnpj,
  handleCnpjChange,
}) => {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
      <Grid item xs={12} sm={5}>
        <Autocomplete
          value={item.application}
          onChange={(event, newValue) => handleChangeApplication(index, newValue)}
          options={applications}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Aplicação para permissão"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingApplications ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Autocomplete
          value={item.user}
          onChange={(event, newValue) => handleChangeUser(index, newValue)}
          options={users}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Super usuário"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingUsers ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          fullWidth
        />
      </Grid>
      <Grid item xs={10} sm={9}>
        <TextField
          label="CNPJ"
          value={cnpj}
          onChange={handleCnpjChange}
          placeholder="Ex.: 00.000.000/0000-00"
          variant="outlined"
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        <IconButton color="error" onClick={() => handleRemoveApplication(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ApplicationUserFields;
