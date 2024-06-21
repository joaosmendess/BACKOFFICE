import React, { useState } from 'react';
import { Box, List, ListItemText, ListItemIcon, Collapse, ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { styled } from '@stitches/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box, {
  width: 250,
});

const DrawerContent: React.FC<{ toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void }> = ({ toggleDrawer }) => {
  const [open, setOpen] = useState<string | null>(null);

  const handleClick = (section: string) => {
    setOpen(open === section ? null : section);
  };

  const sections = [
    {
      title: 'Empresa',
      icon: 'mdi:office-building',
      items: [
        { text: 'Gerenciar empresa', path: '/empresa/gerenciar' },
        { text: 'Lista de empresas', path: '/empresa/lista' },
      ],
    },
    {
      title: 'Usuário do SSO',
      icon: 'mdi:account',
      items: [
        { text: 'Gerenciar usuário de SSO', path: '/usuario-sso/gerenciar' },
        { text: 'Lista de usuários de SSO', path: '/usuario-sso/lista' },
      ],
    },
    {
      title: 'Aplicação para permissão',
      icon: 'mdi:application',
      items: [
        { text: 'Gerenciar aplicação para permissão', path: '/aplicacao-permissao/gerenciar' },
        { text: 'Lista de aplicações para permissão', path: '/aplicacao-permissao/lista' },
      ],
      
    },
    {
      title: 'Módulo para permissão',
      icon: 'mdi:account-key',
      items: [
        { text: 'Gerenciar módulo para permissão', path: '/modulos/gerenciar' },
        { text: 'Lista de módulos para permissão', path: '/modulos/lista' },
      ],
      
    },
    {
      title: 'Convites',
      icon: 'mdi:email',
      items: [
        { text: 'Gerenciar convite', path: '/convites/gerenciar' },
        { text: 'Lista de convites', path: '/convites/lista' },
      ],
    },
    {
      title: 'Tipos de permissões',
      icon: 'mdi:shield-key',
      items: [
        { text: 'Gerenciar permissão', path: '/tipos-permissoes/gerenciar' },
        { text: 'Lista de permissões', path: '/tipos-permissoes/lista' },
      ],
    },
  ];

  return (
    <StyledBox role="presentation">
      <List>
        {sections.map((section) => (
          <React.Fragment key={section.title}>
            <ListItemButton onClick={() => handleClick(section.title)}>
              <ListItemIcon>
                <Icon icon={section.icon} />
              </ListItemIcon>
              <ListItemText primary={section.title} />
              {open === section.title ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open === section.title} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {section.items.map((item) => (
                  <ListItemButton key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                    <ListItemText inset primary={item.text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </StyledBox>
  );
};

export default DrawerContent;
