import React, { useState, useEffect } from 'react';

const Estacionamiento = () => {
  const [placa, setPlaca] = useState('');
  const [espacios, setEspacios] = useState(Array(10).fill(null)); // 10 espacios de parqueo
  const [historial, setHistorial] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [tiempos, setTiempos] = useState({});
  const [tarifas, setTarifas] = useState({});

  const TARIFA_POR_15MIN = 3.25;

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const cargarDatos = () => {
      try {
        const espaciosGuardados = JSON.parse(localStorage.getItem('espacios') || '[]');
        const historialGuardado = JSON.parse(localStorage.getItem('historial') || '[]');
        const vehiculosGuardados = JSON.parse(localStorage.getItem('vehiculos') || '[]');
        
        setEspacios(espaciosGuardados.length ? espaciosGuardados : Array(10).fill(null));
        setHistorial(historialGuardado);
        setVehiculos(vehiculosGuardados);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();

    // Escuchar cambios en localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'espacios') {
        setEspacios(JSON.parse(e.newValue || '[]'));
      } else if (e.key === 'historial') {
        setHistorial(JSON.parse(e.newValue || '[]'));
      } else if (e.key === 'vehiculos') {
        setVehiculos(JSON.parse(e.newValue || '[]'));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Función para calcular la tarifa
  const calcularTarifa = (tiempoMinutos) => {
    const intervalos15min = Math.ceil(tiempoMinutos / 15);
    return (intervalos15min * TARIFA_POR_15MIN).toFixed(2);
  };

  // Función para actualizar los tiempos y tarifas cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const nuevosTiempos = {};
      const nuevasTarifas = {};
      vehiculos.forEach(vehiculo => {
        const horaEntrada = new Date(vehiculo.horaEntrada);
        const tiempoTranscurrido = Math.floor((new Date() - horaEntrada) / 1000);
        const minutos = Math.floor(tiempoTranscurrido / 60);
        const segundos = tiempoTranscurrido % 60;
        nuevosTiempos[vehiculo.id] = `${minutos}:${segundos.toString().padStart(2, '0')}`;
        nuevasTarifas[vehiculo.id] = calcularTarifa(minutos);
      });
      setTiempos(nuevosTiempos);
      setTarifas(nuevasTarifas);
    }, 1000);

    return () => clearInterval(interval);
  }, [vehiculos]);

  // Función para validar el formato de la placa
  const validarPlaca = (placa) => {
    const regex = /^[A-Z0-9]{6}$/;
    return regex.test(placa);
  };

  const registrarEntrada = (e) => {
    e.preventDefault();
    if (!placa) return;

    // Validar formato de placa
    if (!validarPlaca(placa)) {
      alert('La placa debe tener 6 caracteres alfanuméricos');
      return;
    }

    // Buscar un espacio disponible
    const espacioIndex = espacios.findIndex(espacio => espacio === null);
    if (espacioIndex === -1) {
      alert('No hay espacios disponibles');
      return;
    }

    const nuevoVehiculo = {
      placa: placa.toUpperCase(),
      horaEntrada: new Date().toISOString(),
      espacio: espacioIndex + 1,
      id: Date.now()
    };

    const nuevosEspacios = [...espacios];
    nuevosEspacios[espacioIndex] = nuevoVehiculo;
    
    const nuevosVehiculos = [...vehiculos, nuevoVehiculo];
    
    setEspacios(nuevosEspacios);
    setVehiculos(nuevosVehiculos);
    
    // Guardar en localStorage
    localStorage.setItem('espacios', JSON.stringify(nuevosEspacios));
    localStorage.setItem('vehiculos', JSON.stringify(nuevosVehiculos));
    
    // Disparar evento de storage para sincronizar entre pestañas
    window.dispatchEvent(new StorageEvent('storage', { key: 'espacios', newValue: JSON.stringify(nuevosEspacios) }));
    window.dispatchEvent(new StorageEvent('storage', { key: 'vehiculos', newValue: JSON.stringify(nuevosVehiculos) }));
    
    setPlaca('');
  };

  const registrarSalida = (vehiculo) => {
    const horaSalida = new Date();
    const horaEntrada = new Date(vehiculo.horaEntrada);
    const tiempoEstacionado = (horaSalida - horaEntrada) / (1000 * 60);
    const tarifaFinal = calcularTarifa(tiempoEstacionado);

    const registro = {
      ...vehiculo,
      horaSalida: horaSalida.toISOString(),
      tiempoEstacionado: Math.round(tiempoEstacionado),
      tarifa: parseFloat(tarifaFinal)
    };

    const nuevoHistorial = [...historial, registro];
    setHistorial(nuevoHistorial);
    localStorage.setItem('historial', JSON.stringify(nuevoHistorial));
    window.dispatchEvent(new StorageEvent('storage', { key: 'historial', newValue: JSON.stringify(nuevoHistorial) }));

    const nuevosEspacios = [...espacios];
    nuevosEspacios[vehiculo.espacio - 1] = null;
    setEspacios(nuevosEspacios);
    localStorage.setItem('espacios', JSON.stringify(nuevosEspacios));
    window.dispatchEvent(new StorageEvent('storage', { key: 'espacios', newValue: JSON.stringify(nuevosEspacios) }));

    const vehiculosActualizados = vehiculos.filter(v => v.id !== vehiculo.id);
    setVehiculos(vehiculosActualizados);
    localStorage.setItem('vehiculos', JSON.stringify(vehiculosActualizados));
    window.dispatchEvent(new StorageEvent('storage', { key: 'vehiculos', newValue: JSON.stringify(vehiculosActualizados) }));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Sección de Registro */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 glass">
        <h2 className="text-2xl font-bold mb-4 text-gradient">Registro de Vehículo</h2>
        <form onSubmit={registrarEntrada} className="flex gap-4">
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            placeholder="Ingrese la placa (6 caracteres)"
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength="6"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors hover-glow"
          >
            Registrar Entrada
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa de Espacios */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 glass">
            <h3 className="text-xl font-semibold mb-4 text-gradient">Espacios de Parqueo</h3>
            <div className="grid grid-cols-5 gap-4">
              {espacios.map((espacio, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                    espacio 
                      ? 'bg-red-500/20 border-4 border-red-500 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30' 
                      : 'bg-green-500/20 border-4 border-green-500 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30'
                  }`}
                >
                  <span className={`font-bold text-lg mb-2 ${espacio ? 'text-red-500' : 'text-green-500'}`}>
                    Espacio {index + 1}
                  </span>
                  {espacio && (
                    <>
                      <span className="text-sm font-mono mb-2 text-red-500">{espacio.placa}</span>
                      <span className="text-sm font-mono mb-2 text-red-500">
                        Tiempo: {tiempos[espacio.id] || '0:00'}
                      </span>
                      <span className="text-sm font-mono text-yellow-400 mb-2">
                        Tarifa: ${tarifas[espacio.id] || '0.00'}
                      </span>
                      <button
                        onClick={() => registrarSalida(espacio)}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors hover-glow"
                      >
                        Registrar Salida
                      </button>
                    </>
                  )}
                  {!espacio && (
                    <span className="text-sm font-mono text-green-500">
                      Disponible
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Vehículos Estacionados */}
          <div className="bg-white rounded-lg shadow-lg p-6 glass">
            <h3 className="text-xl font-semibold mb-4 text-gradient">Vehículos Estacionados</h3>
            <div className="grid grid-cols-1 gap-4">
              {vehiculos.map((vehiculo) => (
                <div
                  key={vehiculo.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors glass"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold font-mono">{vehiculo.placa}</p>
                      <p className="text-sm text-gray-400">
                        Espacio: {vehiculo.espacio}
                      </p>
                      <p className="text-sm text-gray-400">
                        Entrada: {new Date(vehiculo.horaEntrada).toLocaleString()}
                      </p>
                      <p className="text-sm font-mono text-primary-color">
                        Tiempo: {tiempos[vehiculo.id] || '0:00'}
                      </p>
                      <p className="text-sm font-mono text-yellow-400">
                        Tarifa: ${tarifas[vehiculo.id] || '0.00'}
                      </p>
                    </div>
                    <button
                      onClick={() => registrarSalida(vehiculo)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors hover-glow"
                    >
                      Salida
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historial Reciente */}
          <div className="bg-white rounded-lg shadow-lg p-6 glass">
            <h3 className="text-xl font-semibold mb-4 text-gradient">Historial Reciente</h3>
            <div className="grid grid-cols-1 gap-4">
              {historial.slice(-5).map((registro) => (
                <div
                  key={registro.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors glass"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold font-mono">{registro.placa}</p>
                      <p className="text-sm text-gray-400">
                        Espacio: {registro.espacio}
                      </p>
                      <p className="text-sm text-gray-400">
                        Entrada: {new Date(registro.horaEntrada).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">
                        Salida: {new Date(registro.horaSalida).toLocaleString()}
                      </p>
                      <p className="text-sm font-mono text-primary-color">
                        Tiempo: {registro.tiempoEstacionado} minutos
                      </p>
                      <p className="text-sm font-mono text-yellow-400">
                        Tarifa: ${registro.tarifa.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estacionamiento; 