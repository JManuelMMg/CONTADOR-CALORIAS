import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaClock, FaCar, FaCarSide, FaPalette, FaClipboardList, FaUser, FaEnvelope } from 'react-icons/fa';
import { MdCarRepair, MdLocalCarWash, MdDirectionsCar } from 'react-icons/md';
import { BsCalendarDate } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';

const Reservas = () => {
  const { user } = useAuth();
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState('');
  const [servicio, setServicio] = useState('');
  const [vehiculo, setVehiculo] = useState({
    placa: '',
    modelo: '',
    color: '',
    tipo: ''
  });
  const [reservas, setReservas] = useState([]);

  // Cargar reservas guardadas
  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas') || '[]');
    setReservas(reservasGuardadas);
  }, []);

  // Guardar reservas cuando cambien
  useEffect(() => {
    localStorage.setItem('reservas', JSON.stringify(reservas));
  }, [reservas]);

  const servicios = [
    {
      id: 'estacionamiento',
      nombre: 'Estacionamiento',
      descripcion: 'Reserva de espacio en el estacionamiento',
      icono: <MdDirectionsCar className="text-2xl text-blue-500" />
    },
    {
      id: 'lavado-basico',
      nombre: 'Lavado Básico',
      descripcion: 'Lavado exterior básico del vehículo',
      icono: <MdLocalCarWash className="text-2xl text-green-500" />
    },
    {
      id: 'lavado-premium',
      nombre: 'Lavado Premium',
      descripcion: 'Lavado completo interior y exterior',
      icono: <MdCarRepair className="text-2xl text-purple-500" />
    },
    {
      id: 'encerado',
      nombre: 'Encerado',
      descripcion: 'Servicio de encerado y protección',
      icono: <FaCarSide className="text-2xl text-yellow-500" />
    }
  ];

  const horasDisponibles = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!vehiculo.placa || !vehiculo.modelo || !vehiculo.color || !vehiculo.tipo || !servicio || !hora) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Verificar disponibilidad
    const fechaHora = new Date(fecha);
    const [horaReserva, minutoReserva] = hora.split(':');
    fechaHora.setHours(parseInt(horaReserva), parseInt(minutoReserva), 0);

    const reservaExistente = reservas.find(r => {
      const fechaExistente = new Date(r.fecha);
      return fechaExistente.getTime() === fechaHora.getTime() && r.servicio === servicio;
    });

    if (reservaExistente) {
      alert('Ya existe una reserva para esta fecha y hora');
      return;
    }

    const nuevaReserva = {
      id: Date.now(),
      fecha: fechaHora,
      servicio,
      vehiculo,
      estado: 'pendiente',
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        role: user.role
      }
    };

    setReservas([...reservas, nuevaReserva]);
    
    // Limpiar formulario
    setFecha(new Date());
    setHora('');
    setServicio('');
    setVehiculo({
      placa: '',
      modelo: '',
      color: '',
      tipo: ''
    });
  };

  const cancelarReserva = (id) => {
    setReservas(reservas.filter(r => r.id !== id));
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gradient flex items-center gap-2">
            <FaClipboardList className="text-blue-500" />
            Reservas de Servicios
          </h2>
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-500" />
                <span className="font-medium">{user.nombre} {user.apellidos}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FaEnvelope className="text-blue-500" />
                <span>{user.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 border-l pl-4">
              <FaClock className="text-blue-500" />
              <span>Sesión iniciada: {new Date(user.ultimaSesion).toLocaleString('es-ES')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de Reserva */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BsCalendarDate className="text-blue-500" />
              Nueva Reserva
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <BsCalendarDate className="text-gray-500" />
                  Fecha
                </label>
                <Calendar
                  onChange={setFecha}
                  value={fecha}
                  locale="es-ES"
                  minDate={new Date()}
                  className="w-full border rounded-lg p-2 shadow-sm"
                  tileClassName="hover:bg-blue-100 transition-colors"
                  activeClassName="bg-blue-500 text-white"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <FaClock className="text-gray-500" />
                  Hora
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  required
                >
                  <option value="">Selecciona una hora</option>
                  {horasDisponibles.map(hora => (
                    <option key={hora} value={hora}>{hora}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MdCarRepair className="text-gray-500" />
                  Servicio
                </label>
                <select
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map(servicio => (
                    <option key={servicio.id} value={servicio.id} className="flex items-center gap-2">
                      {servicio.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaCar className="text-gray-500" />
                    Placa
                  </label>
                  <input
                    type="text"
                    value={vehiculo.placa}
                    onChange={(e) => setVehiculo({...vehiculo, placa: e.target.value.toUpperCase()})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    maxLength="6"
                    placeholder="ABC123"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <MdDirectionsCar className="text-gray-500" />
                    Modelo
                  </label>
                  <input
                    type="text"
                    value={vehiculo.modelo}
                    onChange={(e) => setVehiculo({...vehiculo, modelo: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    placeholder="Ej: Corolla 2020"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaPalette className="text-gray-500" />
                    Color
                  </label>
                  <input
                    type="text"
                    value={vehiculo.color}
                    onChange={(e) => setVehiculo({...vehiculo, color: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    placeholder="Ej: Rojo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaCarSide className="text-gray-500" />
                    Tipo de Vehículo
                  </label>
                  <select
                    value={vehiculo.tipo}
                    onChange={(e) => setVehiculo({...vehiculo, tipo: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    required
                  >
                    <option value="">Selecciona el tipo</option>
                    <option value="auto">Auto</option>
                    <option value="camioneta">Camioneta</option>
                    <option value="moto">Moto</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors hover-glow flex items-center justify-center gap-2 font-medium"
              >
                <FaClipboardList />
                Reservar
              </button>
            </form>
          </div>

          {/* Lista de Reservas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaClipboardList className="text-blue-500" />
              Reservas Actuales
            </h3>
            <div className="space-y-4">
              {reservas.map(reserva => {
                const servicioInfo = servicios.find(s => s.id === reserva.servicio);
                return (
                  <div key={reserva.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {servicioInfo?.icono}
                          <h4 className="font-bold text-lg">{servicioInfo?.nombre}</h4>
                        </div>
                        <div className="space-y-2 text-gray-600">
                          <p className="flex items-center gap-2">
                            <BsCalendarDate />
                            <span>{formatearFecha(reserva.fecha)}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <FaCar />
                            <span>{reserva.vehiculo.placa} - {reserva.vehiculo.modelo}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <FaPalette />
                            <span>{reserva.vehiculo.color}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <FaCarSide />
                            <span>{reserva.vehiculo.tipo}</span>
                          </p>
                          <div className="mt-2 pt-2 border-t">
                            <div className="flex flex-col gap-1">
                              <p className="flex items-center gap-2 text-sm">
                                <FaUser className="text-blue-500" />
                                <span className="font-medium">{reserva.usuario?.nombre} {reserva.usuario?.apellidos}</span>
                              </p>
                              <p className="flex items-center gap-2 text-sm text-gray-500">
                                <FaEnvelope className="text-blue-500" />
                                <span>{reserva.usuario?.email}</span>
                              </p>
                              <p className="flex items-center gap-2 text-sm text-gray-500">
                                <FaClock className="text-blue-500" />
                                <span>Reservado el: {new Date(reserva.fecha).toLocaleString('es-ES')}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => cancelarReserva(reserva.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <span className="material-icons-outlined text-sm">close</span>
                        Cancelar
                      </button>
                    </div>
                  </div>
                );
              })}
              {reservas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FaClipboardList className="mx-auto text-4xl mb-2 text-gray-400" />
                  <p>No hay reservas pendientes</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservas; 