// React monta la aplicación en el elemento #root definido en index.html.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Las hojas se cargan en orden: tokens, reglas globales, distribución y componentes.
import './css/variables.css';
import './css/global.css';
import './css/layout.css';
import './css/components.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
