// src/components/ItemList.tsx
import React from 'react';
import { Box, Paper, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { styled } from '@stitches/react';
import { Icon } from '@iconify/react';
import { BaseItem, Module, Application } from '../../types';

const ItemContainer = styled(Paper, {
  padding: '10px',
  margin: '10px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface ItemListProps<T extends BaseItem> {
  items: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

const ItemList = <T extends BaseItem>({ items, onEdit, onDelete }: ItemListProps<T>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = React.useState<null | T>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    if (selectedItem) {
      onEdit(selectedItem);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem);
    }
    handleMenuClose();
  };

  return (
    <div>
      {items.map(item => (
        <ItemContainer key={item.id}>
          <Box>
            <Typography variant="h6">{item.name}</Typography>
            {'relatedApp' in item && <Typography variant="body1">{(item as Module).relatedApp}</Typography>}
            {'description' in item && <Typography variant="body1">{(item as Application).description}</Typography>}
          </Box>
          <IconButton aria-label="menu" onClick={(event) => handleMenuOpen(event, item)}>
            <Icon icon="mdi:dots-vertical" />
          </IconButton>
        </ItemContainer>
      ))}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit} aria-label='editar'>Editar</MenuItem>
        <MenuItem onClick={handleDelete} aria-label='delete'>Excluir</MenuItem>
      </Menu>
    </div>
  );
};

export default ItemList;
