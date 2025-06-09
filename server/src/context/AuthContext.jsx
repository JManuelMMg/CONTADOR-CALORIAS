import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      // Asegurarse de que el usuario tenga todos los campos necesarios
      const updatedUser = {
        ...userData,
        estado: userData.estado || 'activo',
        ultimaSesion: new Date().toISOString(),
        tiempoSesion: 0
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    setLoading(false);
  }, []);

  // Actualizar el tiempo de sesión cada minuto
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        setUser(prevUser => ({
          ...prevUser,
          tiempoSesion: Math.floor((new Date() - new Date(prevUser.ultimaSesion)) / 1000 / 60)
        }));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const login = (userData) => {
    const now = new Date().toISOString();
    const enhancedUserData = {
      ...userData,
      estado: 'activo',
      ultimaSesion: now,
      tiempoSesion: 0,
      fechaRegistro: userData.fechaRegistro || now
    };
    setUser(enhancedUserData);
    localStorage.setItem('currentUser', JSON.stringify(enhancedUserData));
  };

  const logout = () => {
    if (user) {
      // Actualizar el estado del usuario a inactivo antes de cerrar sesión
      const updatedUser = {
        ...user,
        estado: 'inactivo',
        tiempoSesion: 0
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isUser = () => {
    return user?.role === 'user';
  };

  const updateUserStatus = (status) => {
    if (user) {
      const updatedUser = {
        ...user,
        estado: status
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      isAdmin,
      isUser,
      updateUserStatus,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext; 