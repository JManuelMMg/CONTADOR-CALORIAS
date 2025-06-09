import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-container')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="main-nav">
      <nav className="nav-container">
        <div className="nav-logo-container">
          <Link to="/" className="text-white text-2xl font-bold">
            ParkinInterger
          </Link>
          <button 
            className="mobile-menu-toggle" 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>

        <div className="nav-menu-container">
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={isActive('/')}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/estacionamiento" onClick={() => setIsMenuOpen(false)} className={isActive('/estacionamiento')}>
              Estacionamiento
            </Link>
          </li>
          <li>
            <Link to="/autolavado" onClick={() => setIsMenuOpen(false)} className={isActive('/autolavado')}>
              Autolavado
            </Link>
          </li>
          {isAuthenticated() && !isAdmin() && (
            <>
              <li>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={isActive('/dashboard')}>
                  Mi Panel
                </Link>
              </li>
              <li>
                <Link to="/reservas" onClick={() => setIsMenuOpen(false)} className={isActive('/reservas')}>
                  Reservas
                </Link>
              </li>
              <li>
                <Link to="/historial" onClick={() => setIsMenuOpen(false)} className={isActive('/historial')}>
                  Historial
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className={isActive('/profile')}>
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link to="/vehicles" onClick={() => setIsMenuOpen(false)} className={isActive('/vehicles')}>
                  Mis Vehículos
                </Link>
              </li>
              <li>
                <Link to="/billing" onClick={() => setIsMenuOpen(false)} className={isActive('/billing')}>
                  Facturación
                </Link>
              </li>
            </>
          )}
          {isAdmin() && (
            <>
              <li>
                <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className={isActive('/admin/dashboard')}>
                  Panel Admin
                </Link>
              </li>
              <li>
                <Link to="/admin/usuarios" onClick={() => setIsMenuOpen(false)} className={isActive('/admin/usuarios')}>
                  Gestionar Usuarios
                </Link>
              </li>
              <li>
                <Link to="/admin/servicios" onClick={() => setIsMenuOpen(false)} className={isActive('/admin/servicios')}>
                  Gestionar Servicios
                </Link>
              </li>
              <li>
                <Link to="/admin/reportes" onClick={() => setIsMenuOpen(false)} className={isActive('/admin/reportes')}>
                  Reportes
                </Link>
              </li>
            </>
          )}
          </ul>
        </div>

        <div className={`nav-icons ${isMenuOpen ? 'active' : ''}`}>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          
          {isAuthenticated() ? (
            <div className="user-profile">
              <div className="user-info">
                <div className="user-header">
                  <span className="user-name">
                    {user.nombre} {user.apellidos}
                  </span>
                  <div className="user-status">
                    <span className={`status-indicator ${user.estado === 'activo' ? 'status-active' : 'status-inactive'}`}></span>
                    <span>{user.estado === 'activo' ? 'Activo' : 'Inactivo'}</span>
                  </div>
                </div>
                <span className="user-email">{user.email}</span>
                <span className="user-role">
                  {isAdmin() ? 'Administrador' : 'Usuario'}
                </span>
                <div className="user-session">
                  <div>Sesión iniciada: <span className="session-time">{new Date().toLocaleString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}</span></div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="logout-btn"
                aria-label="Cerrar sesión"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login/user"
                className="text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Usuario
              </Link>
              <Link
                to="/login/admin"
                className="text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Administrador
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header; 