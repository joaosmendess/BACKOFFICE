import React from 'react';
import ReactDOM from 'react-dom/client'; // Nova importação para createRoot
import App from './App';
import globalStyles from './globalStyles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

// Aplicar estilos globais
globalStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />

    </ThemeProvider>
  </React.StrictMode>,
)

