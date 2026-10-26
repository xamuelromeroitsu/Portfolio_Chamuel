// React monta la aplicación en el elemento #root definido en index.html.
// La URL es la fuente del idioma: `/` y las rutas desconocidas caen en `/es/`.
// `:lang` se valida en `LanguageRoute`; no añadas rutas de idioma a mano aquí.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './i18n';
import App from './App.jsx';
import LanguageRoute from './components/routing/LanguageRoute.jsx';
import ScrollToHash from './components/routing/ScrollToHash.jsx';
// Las hojas se cargan en orden: tokens, reglas globales, distribución y componentes.
import './css/variables.css';
import './css/global.css';
import './css/layout.css';
import './css/components.css';
// Los estilos específicos del contacto viven junto a la funcionalidad para poder mantenerla como módulo.
import './components/contact/contact.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/es/" replace />} />
        <Route
          path="/:lang"
          element={
            <LanguageRoute>
              <ScrollToHash />
              <App />
            </LanguageRoute>
          }
        />
        <Route path="*" element={<Navigate to="/es/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
