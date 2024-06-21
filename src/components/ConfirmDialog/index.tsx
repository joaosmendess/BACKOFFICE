// src/components/ConfirmDialog.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, title, content, onConfirm, onCancel, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="warning" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="warning" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : 'Excluir'}>
        
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
