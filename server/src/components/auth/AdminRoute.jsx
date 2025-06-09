import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated() || !isAdmin()) {
    // Redirigir al login de administrador si no está autenticado o no es admin
    return <Navigate to="/login/admin" replace />;
  }

  // Renderizar los componentes hijos si es un administrador autenticado
  return children;
};

export default AdminRoute; 