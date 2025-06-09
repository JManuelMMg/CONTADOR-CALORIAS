import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaClock, FaUserShield, FaCircle, FaTrash, FaCalendarAlt, FaHistory } from 'react-icons/fa';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // Cargar usuarios del localStorage
  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    setUsuarios(usuariosGuardados.length > 0 ? usuariosGuardados : [
      { 
        id: 1, 
        nombre: 'Juan Antonio',
        apellidos: 'Pérez Rodríguez',
        email: 'juan.perez@example.com', 
        role: 'user',
        estado: 'activo',
        fechaRegistro: '2024-01-15T10:30:00',
        ultimaSesion: new Date().toISOString(),
        tiempoSesion: 0
      },
      { 
        id: 2, 
        nombre: 'María Isabel',
        apellidos: 'García López',
        email: 'maria.garcia@example.com', 
        role: 'user',
        estado: 'activo',
        fechaRegistro: '2024-02-01T09:15:00',
        ultimaSesion: new Date().toISOString(),
        tiempoSesion: 0
      },
      { 
        id: 3, 
        nombre: 'Admin',
        apellidos: 'Principal Sistema',
        email: 'admin@example.com', 
        role: 'admin',
        estado: 'activo',
        fechaRegistro: '2024-01-01T08:00:00',
        ultimaSesion: new Date().toISOString(),
        tiempoSesion: 0
      }
    ]);
  }, []);

  // Actualizar tiempo de sesión cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setUsuarios(prevUsuarios => prevUsuarios.map(usuario => ({
        ...usuario,
        tiempoSesion: usuario.estado === 'activo' ? 
          Math.floor((new Date() - new Date(usuario.ultimaSesion)) / 1000 / 60) : 0
      })));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatearFechaCompleta = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatearTiempoSesion = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return horas > 0 ? `${horas}h ${mins}m` : `${mins}m`;
  };

  const usuariosFiltrados = usuarios.filter(usuario => {
    const cumpleFiltro = filtro === 'todos' || 
                        (filtro === 'admins' && usuario.role === 'admin') ||
                        (filtro === 'users' && usuario.role === 'user') ||
                        (filtro === 'activos' && usuario.estado === 'activo') ||
                        (filtro === 'inactivos' && usuario.estado === 'inactivo');

    const cumpleBusqueda = usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          usuario.email.toLowerCase().includes(busqueda.toLowerCase());

    return cumpleFiltro && cumpleBusqueda;
  });

  const cambiarEstado = (id) => {
    const nuevosUsuarios = usuarios.map(usuario => {
      if (usuario.id === id) {
        return {
          ...usuario,
          estado: usuario.estado === 'activo' ? 'inactivo' : 'activo'
        };
      }
      return usuario;
    });
    setUsuarios(nuevosUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
  };

  const eliminarUsuario = (id) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      const nuevosUsuarios = usuarios.filter(usuario => usuario.id !== id);
      setUsuarios(nuevosUsuarios);
      localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 glass">
        <h2 className="text-2xl font-bold mb-6 text-gradient flex items-center gap-2">
          <FaUserShield className="text-blue-500" />
          Gestión de Usuarios
        </h2>

        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          >
            <option value="todos">Todos</option>
            <option value="admins">Administradores</option>
            <option value="users">Usuarios</option>
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
          </select>
        </div>

        <div className="grid gap-4">
          {usuariosFiltrados.map(usuario => (
            <div key={usuario.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaUser className={usuario.role === 'admin' ? 'text-purple-500' : 'text-blue-500'} />
                    <div>
                      <span className="font-bold text-lg">
                        {usuario.nombre} {usuario.apellidos}
                      </span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        usuario.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {usuario.role === 'admin' ? 'Administrador' : 'Usuario'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="text-gray-400" />
                    {usuario.email}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>Registro: {formatearFechaCompleta(usuario.fechaRegistro)}</span>
                    </p>
                    
                    <p className="flex items-center gap-2 text-gray-600">
                      <FaClock className="text-gray-400" />
                      <span>Última sesión: {formatearFechaCompleta(usuario.ultimaSesion)}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <FaCircle className={`text-xs ${
                        usuario.estado === 'activo' ? 'text-green-500' : 'text-red-500'
                      }`} />
                      <span className={usuario.estado === 'activo' ? 'text-green-600' : 'text-red-600'}>
                        {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    
                    {usuario.estado === 'activo' && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaHistory className="text-blue-400" />
                        <span>Tiempo de sesión: {formatearTiempoSesion(usuario.tiempoSesion)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => cambiarEstado(usuario.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      usuario.estado === 'activo' 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {usuario.estado === 'activo' ? 'Desactivar' : 'Activar'}
                  </button>
                  <button
                    onClick={() => eliminarUsuario(usuario.id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {usuariosFiltrados.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FaUser className="mx-auto text-4xl mb-2 text-gray-400" />
              <p>No se encontraron usuarios</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsuarios; 