import React, { useState } from 'react';

const AdminServicios = () => {
  const [servicios, setServicios] = useState({
    estacionamiento: {
      tarifas: [
        { id: 1, tipo: 'Por hora', precio: 10 },
        { id: 2, tipo: 'Por día', precio: 50 },
      ]
    },
    autolavado: {
      servicios: [
        { id: 1, nombre: 'Lavado Básico', precio: 80, duracion: '30 min' },
        { id: 2, nombre: 'Lavado Premium', precio: 150, duracion: '1 hora' },
      ]
    }
  });

  const [editando, setEditando] = useState(null);
  const [nuevoServicio, setNuevoServicio] = useState({
    tipo: '',
    nombre: '',
    precio: '',
    duracion: ''
  });

  const handleEdit = (tipo, servicio) => {
    setEditando({ tipo, servicio });
    setNuevoServicio(servicio);
  };

  const handleSave = () => {
    if (editando) {
      const { tipo } = editando;
      setServicios(prev => ({
        ...prev,
        [tipo]: {
          ...prev[tipo],
          [tipo === 'estacionamiento' ? 'tarifas' : 'servicios']: prev[tipo][tipo === 'estacionamiento' ? 'tarifas' : 'servicios'].map(s =>
            s.id === editando.servicio.id ? { ...s, ...nuevoServicio } : s
          )
        }
      }));
    }
    setEditando(null);
    setNuevoServicio({ tipo: '', nombre: '', precio: '', duracion: '' });
  };

  const handleDelete = (tipo, id) => {
    setServicios(prev => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [tipo === 'estacionamiento' ? 'tarifas' : 'servicios']: prev[tipo][tipo === 'estacionamiento' ? 'tarifas' : 'servicios'].filter(s => s.id !== id)
      }
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 glass">
        <h2 className="text-2xl font-bold mb-6 text-gradient">Gestión de Servicios</h2>

        {/* Sección de Estacionamiento */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Tarifas de Estacionamiento</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Precio</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.estacionamiento.tarifas.map(tarifa => (
                  <tr key={tarifa.id} className="border-b">
                    <td className="px-4 py-2">{tarifa.tipo}</td>
                    <td className="px-4 py-2">${tarifa.precio}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit('estacionamiento', tarifa)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete('estacionamiento', tarifa.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección de Autolavado */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Servicios de Autolavado</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Servicio</th>
                  <th className="px-4 py-2">Precio</th>
                  <th className="px-4 py-2">Duración</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.autolavado.servicios.map(servicio => (
                  <tr key={servicio.id} className="border-b">
                    <td className="px-4 py-2">{servicio.nombre}</td>
                    <td className="px-4 py-2">${servicio.precio}</td>
                    <td className="px-4 py-2">{servicio.duracion}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit('autolavado', servicio)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete('autolavado', servicio.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Edición */}
        {editando && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h4 className="text-lg font-semibold mb-4">
                Editar {editando.tipo === 'estacionamiento' ? 'Tarifa' : 'Servicio'}
              </h4>
              <div className="space-y-4">
                {editando.tipo === 'autolavado' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                      type="text"
                      value={nuevoServicio.nombre}
                      onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">Precio</label>
                  <input
                    type="number"
                    value={nuevoServicio.precio}
                    onChange={(e) => setNuevoServicio({ ...nuevoServicio, precio: parseFloat(e.target.value) })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                {editando.tipo === 'autolavado' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Duración</label>
                    <input
                      type="text"
                      value={nuevoServicio.duracion}
                      onChange={(e) => setNuevoServicio({ ...nuevoServicio, duracion: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditando(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServicios; 