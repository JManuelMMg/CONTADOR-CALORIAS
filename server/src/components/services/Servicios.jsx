import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Estacionamiento from './Estacionamiento';
import Autolavado from './Autolavado';

const Servicios = () => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const servicios = [
    {
      id: 'estacionamiento',
      nombre: 'Estacionamiento',
      descripcion: 'Servicio de estacionamiento por tiempo con tarifa por hora',
      icono: '🚗',
      ruta: '/estacionamiento'
    },
    {
      id: 'autolavado',
      nombre: 'Autolavado',
      descripcion: 'Servicios completos de lavado y mantenimiento de vehículos',
      icono: '🚿',
      ruta: '/autolavado'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 glass">
        <h2 className="text-2xl font-bold mb-6 text-gradient">Nuestros Servicios</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicios.map(servicio => (
            <div
              key={servicio.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 glass cursor-pointer"
              onClick={() => setServicioSeleccionado(servicio.id)}
            >
              <div className="text-4xl mb-4">{servicio.icono}</div>
              <h3 className="text-xl font-bold mb-2">{servicio.nombre}</h3>
              <p className="text-gray-600 mb-4">{servicio.descripcion}</p>
              <Link
                to={servicio.ruta}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors hover-glow"
              >
                Ir al servicio
              </Link>
            </div>
          ))}
        </div>

        {/* Información Adicional */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 glass">
            <h3 className="text-lg font-semibold mb-4">Horarios de Atención</h3>
            <ul className="space-y-2">
              <li>Lunes a Viernes: 8:00 AM - 8:00 PM</li>
              <li>Sábados: 9:00 AM - 6:00 PM</li>
              <li>Domingos: 9:00 AM - 2:00 PM</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 glass">
            <h3 className="text-lg font-semibold mb-4">Promociones Activas</h3>
            <ul className="space-y-2">
              <li>• 20% de descuento en lavado básico</li>
              <li>• Combo lavado + encerado con 15% off</li>
              <li>• Estacionamiento por día con precio especial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios; 