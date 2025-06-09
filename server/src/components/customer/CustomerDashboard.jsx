import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const [activeReservations, setActiveReservations] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  
  useEffect(() => {
    // Aquí se cargarían los datos del usuario desde la API
    // Por ahora usamos datos de ejemplo
    setActiveReservations([
      { id: 1, service: 'Estacionamiento', date: '2025-05-18', status: 'Confirmada' },
      { id: 2, service: 'Autolavado', date: '2025-05-20', status: 'Pendiente' }
    ]);
    
    setRecentServices([
      { id: 101, type: 'Estacionamiento', date: '2025-05-15', cost: '$150' },
      { id: 102, type: 'Autolavado', date: '2025-05-10', cost: '$250' }
    ]);
  }, []);

  return (
    <div className="customer-dashboard">
      <h1 className="text-2xl font-bold mb-6">Bienvenido, {currentUser?.name || 'Usuario'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reservas Activas</h2>
          {activeReservations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {activeReservations.map(reservation => (
                <li key={reservation.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{reservation.service}</p>
                      <p className="text-sm text-gray-500">{reservation.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      reservation.status === 'Confirmada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tienes reservas activas</p>
          )}
          <div className="mt-4">
            <Link to="/reservas" className="text-blue-600 hover:text-blue-800">
              Ver todas las reservas →
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Servicios Recientes</h2>
          {recentServices.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {recentServices.map(service => (
                <li key={service.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{service.type}</p>
                      <p className="text-sm text-gray-500">{service.date}</p>
                    </div>
                    <span className="font-medium">{service.cost}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tienes servicios recientes</p>
          )}
          <div className="mt-4">
            <Link to="/historial" className="text-blue-600 hover:text-blue-800">
              Ver historial completo →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          to="/estacionamiento" 
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center"
        >
          Reservar Estacionamiento
        </Link>
        <Link 
          to="/autolavado" 
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center"
        >
          Reservar Autolavado
        </Link>
        <Link 
          to="/billing" 
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center"
        >
          Gestionar Pagos
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboard;
