import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Importa el archivo de tu aplicación principal
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);