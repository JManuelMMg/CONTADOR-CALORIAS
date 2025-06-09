import React, { useState, useEffect } from 'react';

const Estacionamiento = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    placa: '',
    horaEntrada: null,
    horaSalida: null,
    costo: 0
  });
  const [historial, setHistorial] = useState([]);
  const [espacios, setEspacios] = useState(Array(10).fill(null)); // 10 espacios de estacionamiento

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const vehiculosGuardados = localStorage.getItem('vehiculos');
    const historialGuardado = localStorage.getItem('historial');
    if (vehiculosGuardados) setVehiculos(JSON.parse(vehiculosGuardados));
    if (historialGuardado) setHistorial(JSON.parse(historialGuardado));
  }, []);

  // Guardar datos cuando cambien
  useEffect(() => {
    localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
  }, [vehiculos]);

  useEffect(() => {
    localStorage.setItem('historial', JSON.stringify(historial));
  }, [historial]);

  // Calcular costo basado en el tiempo
  const calcularCosto = (horaEntrada, horaSalida) => {
    const entrada = new Date(horaEntrada);
    const salida = new Date(horaSalida);
    const diferencia = salida - entrada;
    const horas = diferencia / (1000 * 60 * 60);
    const tarifaPorHora = 50; // $50 por hora
    return Math.ceil(horas * tarifaPorHora);
  };

  const registrarEntrada = () => {
    if (!nuevoVehiculo.placa || nuevoVehiculo.placa.length !== 6) {
      alert('Por favor, ingrese una placa válida de 6 caracteres');
      return;
    }

    if (vehiculos.some(v => v.placa === nuevoVehiculo.placa)) {
      alert('Este vehículo ya está registrado en el estacionamiento');
      return;
    }

    const espacioDisponible = espacios.findIndex(espacio => espacio === null);
    if (espacioDisponible === -1) {
      alert('No hay espacios disponibles');
      return;
    }

    const vehiculo = {
      ...nuevoVehiculo,
      horaEntrada: new Date(),
      espacio: espacioDisponible + 1
    };

    setVehiculos([...vehiculos, vehiculo]);
    setEspacios(espacios.map((espacio, index) => 
      index === espacioDisponible ? vehiculo.placa : espacio
    ));
    setNuevoVehiculo({ placa: '', horaEntrada: null, horaSalida: null, costo: 0 });
  };

  const registrarSalida = (placa) => {
    const vehiculo = vehiculos.find(v => v.placa === placa);
    if (!vehiculo) return;

    const horaSalida = new Date();
    const costo = calcularCosto(vehiculo.horaEntrada, horaSalida);

    const vehiculoActualizado = {
      ...vehiculo,
      horaSalida,
      costo
    };

    setHistorial([...historial, vehiculoActualizado]);
    setVehiculos(vehiculos.filter(v => v.placa !== placa));
    setEspacios(espacios.map(espacio => 
      espacio === placa ? null : espacio
    ));
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 glass">
        <h2 className="text-2xl font-bold mb-6 text-gradient">Estacionamiento</h2>

        {/* Formulario de Entrada */}
        <div className="mb-8 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Registrar Entrada</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Ingrese la placa (6 caracteres)"
              value={nuevoVehiculo.placa}
              onChange={(e) => setNuevoVehiculo({...nuevoVehiculo, placa: e.target.value.toUpperCase()})}
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength="6"
            />
            <button
              onClick={registrarEntrada}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors hover-glow"
            >
              Registrar Entrada
            </button>
          </div>
        </div>

        {/* Visualización de Espacios */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Espacios de Estacionamiento</h3>
          <div className="grid grid-cols-5 gap-4">
            {espacios.map((espacio, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg text-center ${
                  espacio ? 'bg-red-100 border-red-500' : 'bg-green-100 border-green-500'
                } border-2`}
              >
                <div className="font-bold">Espacio {index + 1}</div>
                <div className="text-sm">
                  {espacio ? `Placa: ${espacio}` : 'Disponible'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehículos Estacionados */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Vehículos Estacionados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehiculos.map(vehiculo => (
              <div key={vehiculo.placa} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold">Placa: {vehiculo.placa}</div>
                    <div className="text-sm text-gray-600">
                      Entrada: {formatearFecha(vehiculo.horaEntrada)}
                    </div>
                  </div>
                  <button
                    onClick={() => registrarSalida(vehiculo.placa)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Registrar Salida
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historial */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Historial de Vehículos</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Placa</th>
                  <th className="px-4 py-2">Entrada</th>
                  <th className="px-4 py-2">Salida</th>
                  <th className="px-4 py-2">Costo</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((registro, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{registro.placa}</td>
                    <td className="px-4 py-2">{formatearFecha(registro.horaEntrada)}</td>
                    <td className="px-4 py-2">{formatearFecha(registro.horaSalida)}</td>
                    <td className="px-4 py-2">${registro.costo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estacionamiento; 