import React from 'react';
import ReactDOM from 'react-dom/client'; // Nova importação para createRoot
import App from './App';
import globalStyles from './globalStyles';

// Aplicar estilos globais
globalStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

