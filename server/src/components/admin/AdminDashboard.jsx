import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeReservations: 0,
    totalRevenue: 0,
    availableSpots: 0
  });
  
  const [recentActivities, setRecentActivities] = useState([]);
  
  useEffect(() => {
    // Aquí cargaríamos los datos desde la API
    // Por ahora usamos datos de ejemplo
    setStats({
      totalUsers: 120,
      activeReservations: 45,
      totalRevenue: 25000,
      availableSpots: 32
    });
    
    setRecentActivities([
      { id: 1, type: 'reservation', user: 'Juan Pérez', service: 'Estacionamiento', time: '2025-05-17 14:30' },
      { id: 2, type: 'payment', user: 'María González', amount: '$350', time: '2025-05-17 13:15' },
      { id: 3, type: 'user_registered', user: 'Carlos Rodríguez', time: '2025-05-17 12:00' },
      { id: 4, type: 'service_completed', user: 'Ana López', service: 'Autolavado', time: '2025-05-17 11:45' }
    ]);
  }, []);
  
  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Usuarios Totales</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          <Link to="/admin/usuarios" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
            Ver detalles →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Reservas Activas</h3>
          <p className="text-3xl font-bold mt-2">{stats.activeReservations}</p>
          <Link to="/admin/servicios" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
            Ver detalles →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Ingresos Totales</h3>
          <p className="text-3xl font-bold mt-2">${stats.totalRevenue}</p>
          <Link to="/admin/reportes" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
            Ver detalles →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Espacios Disponibles</h3>
          <p className="text-3xl font-bold mt-2">{stats.availableSpots}</p>
          <Link to="/admin/servicios" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
            Ver detalles →
          </Link>
        </div>
      </div>
      
      {/* Acciones rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/admin/usuarios/nuevo" 
            className="flex items-center justify-center p-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
          >
            <span className="mr-2">➕</span> Agregar Usuario
          </Link>
          <Link 
            to="/admin/servicios/nuevo" 
            className="flex items-center justify-center p-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
          >
            <span className="mr-2">➕</span> Crear Servicio
          </Link>
          <Link 
            to="/admin/reportes/generar" 
            className="flex items-center justify-center p-3 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200"
          >
            <span className="mr-2">📊</span> Generar Reporte
          </Link>
        </div>
      </div>
      
      {/* Actividad reciente */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actividad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map(activity => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.type === 'reservation' && (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Nueva Reserva
                      </span>
                    )}
                    {activity.type === 'payment' && (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Pago Recibido
                      </span>
                    )}
                    {activity.type === 'user_registered' && (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        Usuario Registrado
                      </span>
                    )}
                    {activity.type === 'service_completed' && (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Servicio Completado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.service && `Servicio: ${activity.service}`}
                    {activity.amount && `Monto: ${activity.amount}`}
                    {!activity.service && !activity.amount && '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <Link to="/admin/actividad" className="text-blue-600 hover:text-blue-800">
            Ver toda la actividad →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
