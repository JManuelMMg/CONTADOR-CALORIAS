import React, { useState, useEffect } from 'react';

const Billing = () => {
  const [historial, setHistorial] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

  useEffect(() => {
    const historialEstacionamiento = JSON.parse(localStorage.getItem('historial') || '[]');
    const historialAutolavado = JSON.parse(localStorage.getItem('historialAutolavado') || '[]');
    
    const historialCombinado = [
      ...historialEstacionamiento.map(item => ({ ...item, tipo: 'estacionamiento' })),
      ...historialAutolavado.map(item => ({ ...item, tipo: 'autolavado' }))
    ].sort((a, b) => new Date(b.horaSalida) - new Date(a.horaSalida));

    setHistorial(historialCombinado);
  }, []);

  const historialFiltrado = historial.filter(item => {
    const cumpleTipo = filtro === 'todos' || item.tipo === filtro;
    const cumpleFechaInicio = !fechaInicio || new Date(item.horaSalida) >= new Date(fechaInicio);
    const cumpleFechaFin = !fechaFin || new Date(item.horaSalida) <= new Date(fechaFin);
    return cumpleTipo && cumpleFechaInicio && cumpleFechaFin;
  });

  const totales = historialFiltrado.reduce((acc, item) => {
    acc.total += item.costo || item.tarifa || item.precio;
    if (item.tipo === 'estacionamiento') {
      acc.estacionamiento += item.costo || item.tarifa;
    } else {
      acc.autolavado += item.precio;
    }
    return acc;
  }, { total: 0, estacionamiento: 0, autolavado: 0 });

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generarFactura = (item) => {
    const factura = `
      ╔════════════════════════════════════════════════════════════════════════════════╗
      ║                                FACTURA DE SERVICIO                              ║
      ╠════════════════════════════════════════════════════════════════════════════════╣
      ║ Fecha: ${formatearFecha(item.horaSalida)}
      ║ Número de Factura: ${Date.now()}
      ║
      ║ CLIENTE:
      ║ Placa: ${item.placa}
      ║ ${item.vehiculo ? `Modelo: ${item.vehiculo.modelo}
      ║ Color: ${item.vehiculo.color}
      ║ Tipo: ${item.vehiculo.tipo}` : ''}
      ║
      ║ SERVICIO:
      ║ Tipo: ${item.tipo === 'estacionamiento' ? 'Estacionamiento' : 'Autolavado'}
      ║ ${item.tipo === 'estacionamiento' ? 
        `Entrada: ${formatearFecha(item.horaEntrada)}
        ║ Salida: ${formatearFecha(item.horaSalida)}
        ║ Tiempo: ${item.tiempoEstacionado} minutos` : 
        `Servicio: ${item.nombre}
        ║ Duración: ${item.duracion}`}
      ║
      ║ DETALLE DE COSTOS:
      ║ ${item.tipo === 'estacionamiento' ? 
        `Tarifa por 15 minutos: $3.25
        ║ Tiempo total: ${item.tiempoEstacionado} minutos
        ║ Total: $${item.tarifa || item.costo}` : 
        `Servicio: ${item.nombre}
        ║ Precio: $${item.precio}`}
      ║
      ║ ╔════════════════════════════════════════════════════════════════════════════╗
      ║ ║                     ¡Gracias por su preferencia!                          ║
      ║ ╚════════════════════════════════════════════════════════════════════════════╝
      ╚════════════════════════════════════════════════════════════════════════════════╝
    `;

    const blob = new Blob([factura], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `factura-${item.placa}-${new Date().getTime()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 glass">
        <h2 className="text-2xl font-bold mb-6 text-gradient">Facturación y Cobros</h2>

        {/* Filtros */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Servicio</label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los Servicios</option>
              <option value="estacionamiento">Estacionamiento</option>
              <option value="autolavado">Autolavado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Resumen de Totales */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total General</h3>
            <p className="text-2xl font-bold text-blue-600">${totales.total.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Estacionamiento</h3>
            <p className="text-2xl font-bold text-green-600">${totales.estacionamiento.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Autolavado</h3>
            <p className="text-2xl font-bold text-purple-600">${totales.autolavado.toFixed(2)}</p>
          </div>
        </div>

        {/* Tabla de Facturas */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Placa</th>
                <th className="px-4 py-2">Detalles</th>
                <th className="px-4 py-2">Costo</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {historialFiltrado.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{formatearFecha(item.horaSalida)}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.tipo === 'estacionamiento' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.tipo === 'estacionamiento' ? 'Estacionamiento' : 'Autolavado'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{item.placa}</td>
                  <td className="px-4 py-2">
                    {item.tipo === 'estacionamiento' ? (
                      <>
                        Entrada: {formatearFecha(item.horaEntrada)}<br />
                        Salida: {formatearFecha(item.horaSalida)}
                      </>
                    ) : (
                      <>
                        Servicio: {item.nombre}<br />
                        Duración: {item.duracion}
                      </>
                    )}
                  </td>
                  <td className="px-4 py-2 font-bold">
                    ${(item.costo || item.tarifa || item.precio).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => generarFactura(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      Generar Factura
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing; 