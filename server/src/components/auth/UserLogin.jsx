import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Aquí iría la validación con el backend
      // Por ahora, simulamos un login de usuario
      if (email && password) {
        const now = new Date().toISOString();
        login({
          id: Date.now(),
          nombre: 'Usuario',
          apellidos: 'Demo Ejemplo',
          email: email,
          role: 'user',
          estado: 'activo',
          fechaRegistro: now,
          ultimaSesion: now,
          tiempoSesion: 0
        });
        navigate('/reservas');
      } else {
        setError('Por favor complete todos los campos');
      }
    } catch (err) {
      console.error('Error de login:', err);
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className={`max-w-md mx-auto rounded-lg shadow-lg p-6 glass ${isDarkMode ? 'bg-dark-card' : 'bg-light-card'}`}>
        <h2 className="text-2xl font-bold mb-6 text-gradient">Iniciar Sesión</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>

          <div className="text-center mt-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ¿No tienes una cuenta?{' '}
              <Link to="/registro" className="text-blue-500 hover:text-blue-600">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin; 