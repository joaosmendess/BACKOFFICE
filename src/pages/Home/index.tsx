import React from 'react';
import Header from '../../components/Header';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Home;
