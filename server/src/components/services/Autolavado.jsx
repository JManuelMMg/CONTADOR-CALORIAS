import React, { useState, useEffect } from 'react';

const Autolavado = () => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [vehiculo, setVehiculo] = useState({
    placa: '',
    modelo: '',
    color: '',
    tipo: ''
  });

  const servicios = {
    limpiezaExterior: {
      nombre: 'Limpieza Exterior',
      servicios: [
        {
          id: 'lavado-basico',
          nombre: 'Lavado Básico',
          descripcion: 'Eliminación de polvo, barro y suciedad general del exterior',
          precio: 300,
          duracion: '30 min',
          incluye: [
            'Lavado con agua y jabón',
            'Enjuague',
            'Secado con toallas de microfibra',
            'Limpieza de rines y llantas'
          ]
        },
        {
          id: 'encerado',
          nombre: 'Encerado',
          descripcion: 'Aplicación de cera para proteger la pintura y dar brillo',
          precio: 400,
          duracion: '45 min',
          incluye: [
            'Lavado básico',
            'Aplicación de cera',
            'Pulido manual',
            'Protección UV'
          ]
        }
      ]
    },
    limpiezaInterior: {
      nombre: 'Limpieza Interior',
      servicios: [
        {
          id: 'aspirado',
          nombre: 'Aspirado Completo',
          descripcion: 'Limpieza profunda del interior del vehículo',
          precio: 350,
          duracion: '30 min',
          incluye: [
            'Aspirado de asientos',
            'Limpieza de alfombras',
            'Limpieza de maletero',
            'Limpieza de consola'
          ]
        },
        {
          id: 'limpieza-tapiceria',
          nombre: 'Limpieza de Tapicería',
          descripcion: 'Limpieza y desinfección completa de asientos',
          precio: 1400,
          duracion: '60 min',
          incluye: [
            'Limpieza de asientos',
            'Desinfección',
            'Tratamiento anti-manchas',
            'Desodorización'
          ]
        }
      ]
    },
    mantenimiento: {
      nombre: 'Mantenimiento y Protección',
      servicios: [
        {
          id: 'pulido',
          nombre: 'Pulido de Carrocería',
          descripcion: 'Eliminación de rayones y restauración del brillo',
          precio: 800,
          duracion: '90 min',
          incluye: [
            'Lavado básico',
            'Pulido manual',
            'Aplicación de sellador',
            'Protección UV'
          ]
        },
        {
          id: 'sellado-ceramico',
          nombre: 'Sellado Cerámico',
          descripcion: 'Protección de larga duración para la pintura',
          precio: 2000,
          duracion: '120 min',
          incluye: [
            'Lavado y descontaminación',
            'Aplicación de sellador cerámico',
            'Curación con luz UV',
            'Garantía de 6 meses'
          ]
        }
      ]
    },
    especializados: {
      nombre: 'Servicios Especializados',
      servicios: [
        {
          id: 'limpieza-motor',
          nombre: 'Limpieza de Motor',
          descripcion: 'Limpieza profunda del compartimento del motor',
          precio: 600,
          duracion: '45 min',
          incluye: [
            'Limpieza segura del motor',
            'Protección de componentes',
            'Aplicación de protectores',
            'Inspección visual'
          ]
        },
        {
          id: 'restauracion-faros',
          nombre: 'Restauración de Faros',
          descripcion: 'Pulido y restauración de faros opacos',
          precio: 300,
          duracion: '30 min',
          incluye: [
            'Limpieza de faros',
            'Pulido especializado',
            'Aplicación de protector UV',
            'Garantía de 3 meses'
          ]
        }
      ]
    }
  };

  const handleReservar = (servicio) => {
    setServicioSeleccionado(servicio);
  };

  const handleConfirmarReserva = () => {
    if (!vehiculo.placa || !vehiculo.modelo || !vehiculo.color || !vehiculo.tipo) {
      alert('Por favor, complete todos los datos del vehículo');
      return;
    }

    const reserva = {
      ...servicioSeleccionado,
      placa: vehiculo.placa,
      horaSalida: new Date(),
      vehiculo: {
        modelo: vehiculo.modelo,
        color: vehiculo.color,
        tipo: vehiculo.tipo
      }
    };

    try {
      // Guardar en historial
      const historialActual = JSON.parse(localStorage.getItem('historialAutolavado') || '[]');
      const nuevoHistorial = [...historialActual, reserva];
      localStorage.setItem('historialAutolavado', JSON.stringify(nuevoHistorial));
      
      // Disparar evento de storage para sincronizar entre pestañas
      window.dispatchEvent(new StorageEvent('storage', { 
        key: 'historialAutolavado', 
        newValue: JSON.stringify(nuevoHistorial) 
      }));

      // Limpiar formulario
      setServicioSeleccionado(null);
      setVehiculo({
        placa: '',
        modelo: '',
        color: '',
        tipo: ''
      });
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      alert('Error al guardar la reserva. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 glass">
        <h2 className="text-2xl font-bold mb-4 text-gradient">Servicios de Autolavado</h2>

        {/* Formulario de Vehículo */}
        <div className="mb-8 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Datos del Vehículo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Placa</label>
              <input
                type="text"
                value={vehiculo.placa}
                onChange={(e) => setVehiculo({...vehiculo, placa: e.target.value.toUpperCase()})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength="6"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Modelo</label>
              <input
                type="text"
                value={vehiculo.modelo}
                onChange={(e) => setVehiculo({...vehiculo, modelo: e.target.value})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="text"
                value={vehiculo.color}
                onChange={(e) => setVehiculo({...vehiculo, color: e.target.value})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Vehículo</label>
              <select
                value={vehiculo.tipo}
                onChange={(e) => setVehiculo({...vehiculo, tipo: e.target.value})}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona el tipo</option>
                <option value="auto">Auto</option>
                <option value="camioneta">Camioneta</option>
                <option value="moto">Moto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Catálogo de Servicios */}
        <div className="space-y-8">
          {Object.entries(servicios).map(([categoria, info]) => (
            <div key={categoria}>
              <h3 className="text-xl font-semibold mb-4 text-gradient">{info.nombre}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {info.servicios.map(servicio => (
                  <div
                    key={servicio.id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 glass"
                  >
                    <h4 className="text-lg font-bold mb-2">{servicio.nombre}</h4>
                    <p className="text-gray-600 mb-4">{servicio.descripcion}</p>
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Incluye:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {servicio.incluye.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-primary-color">
                        ${servicio.precio}
                      </span>
                      <span className="text-sm text-gray-500">
                        {servicio.duracion}
                      </span>
                    </div>
                    <button
                      onClick={() => handleReservar(servicio)}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors hover-glow"
                    >
                      Reservar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Confirmación */}
        {servicioSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Confirmar Reserva</h3>
              <div className="space-y-4">
                <p><strong>Servicio:</strong> {servicioSeleccionado.nombre}</p>
                <p><strong>Precio:</strong> ${servicioSeleccionado.precio}</p>
                <p><strong>Duración:</strong> {servicioSeleccionado.duracion}</p>
                <p><strong>Placa:</strong> {vehiculo.placa}</p>
                <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
                <p><strong>Color:</strong> {vehiculo.color}</p>
                <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setServicioSeleccionado(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmarReserva}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Autolavado; 