import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { styled } from '@stitches/react';

const StyledButton = styled(Button, {
  alignSelf: 'flex-start',
  marginTop: '1rem',
});

interface SaveButtonProps {
  onClick: () => void;
  saving: boolean;
  disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, saving, disabled }) => {
  return (
    <StyledButton variant="contained" color="primary" onClick={onClick} disabled={saving || disabled}>
      {saving ? <CircularProgress color="inherit" size={24} /> : 'Salvar'}
    </StyledButton>
  );
};

export default SaveButton;
