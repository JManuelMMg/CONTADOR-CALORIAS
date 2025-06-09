import React, { useState } from 'react';

const AdminReportes = () => {
  const [filtroFecha, setFiltroFecha] = useState({
    inicio: '',
    fin: ''
  });

  // Datos de ejemplo para los reportes
  const datos = {
    ingresos: {
      total: 15000,
      estacionamiento: 8000,
      autolavado: 7000,
      porMes: [
        { mes: 'Enero', cantidad: 4500 },
        { mes: 'Febrero', cantidad: 5200 },
        { mes: 'Marzo', cantidad: 5300 }
      ]
    },
    servicios: {
      estacionamiento: {
        totalServicios: 250,
        horasPico: '14:00 - 16:00',
        ocupacionPromedio: '75%'
      },
      autolavado: {
        totalServicios: 180,
        servicioPopular: 'Lavado Premium',
        satisfaccionCliente: '4.5/5'
      }
    },
    usuarios: {
      total: 150,
      nuevos: 25,
      activos: 120,
      inactivos: 30
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 glass">
        <h2 className="text-2xl font-bold mb-6 text-gradient">Reportes y Estadísticas</h2>

        {/* Filtros de fecha */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={filtroFecha.inicio}
              onChange={(e) => setFiltroFecha({ ...filtroFecha, inicio: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Fin</label>
            <input
              type="date"
              value={filtroFecha.fin}
              onChange={(e) => setFiltroFecha({ ...filtroFecha, fin: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Resumen de Ingresos */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Resumen de Ingresos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Total</h4>
              <p className="text-2xl font-bold text-blue-600">${datos.ingresos.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Estacionamiento</h4>
              <p className="text-2xl font-bold text-green-600">${datos.ingresos.estacionamiento}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Autolavado</h4>
              <p className="text-2xl font-bold text-purple-600">${datos.ingresos.autolavado}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas de Servicios */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Estadísticas de Servicios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estacionamiento */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-4">Estacionamiento</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Servicios:</span>
                  <span className="font-semibold">{datos.servicios.estacionamiento.totalServicios}</span>
                </div>
                <div className="flex justify-between">
                  <span>Horas Pico:</span>
                  <span className="font-semibold">{datos.servicios.estacionamiento.horasPico}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ocupación Promedio:</span>
                  <span className="font-semibold">{datos.servicios.estacionamiento.ocupacionPromedio}</span>
                </div>
              </div>
            </div>

            {/* Autolavado */}
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-4">Autolavado</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Servicios:</span>
                  <span className="font-semibold">{datos.servicios.autolavado.totalServicios}</span>
                </div>
                <div className="flex justify-between">
                  <span>Servicio más Popular:</span>
                  <span className="font-semibold">{datos.servicios.autolavado.servicioPopular}</span>
                </div>
                <div className="flex justify-between">
                  <span>Satisfacción Cliente:</span>
                  <span className="font-semibold">{datos.servicios.autolavado.satisfaccionCliente}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas de Usuarios */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Estadísticas de Usuarios</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm text-gray-600">Total Usuarios</h4>
              <p className="text-2xl font-bold">{datos.usuarios.total}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm text-gray-600">Usuarios Nuevos</h4>
              <p className="text-2xl font-bold text-green-600">{datos.usuarios.nuevos}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm text-gray-600">Usuarios Activos</h4>
              <p className="text-2xl font-bold text-blue-600">{datos.usuarios.activos}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="text-sm text-gray-600">Usuarios Inactivos</h4>
              <p className="text-2xl font-bold text-red-600">{datos.usuarios.inactivos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportes; 