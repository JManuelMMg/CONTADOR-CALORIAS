import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const CustomerVehicles = () => {
  const { currentUser } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [newVehicle, setNewVehicle] = useState({
    model: '',
    brand: '',
    year: '',
    color: '',
    plate: '',
    type: 'sedan'
  });
  
  useEffect(() => {
    // Aquí cargaríamos los vehículos del usuario desde la API
    // Por ahora usamos datos de ejemplo
    setVehicles([
      { id: 1, model: 'Civic', brand: 'Honda', year: '2020', color: 'Rojo', plate: 'ABC123', type: 'sedan' },
      { id: 2, model: 'CRV', brand: 'Honda', year: '2019', color: 'Azul', plate: 'XYZ789', type: 'suv' }
    ]);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Aquí iría la lógica para agregar un vehículo
      // Por ahora simulamos una operación exitosa
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Agregar el nuevo vehículo a la lista local
      const vehicleWithId = {
        ...newVehicle,
        id: Date.now() // Generamos un ID temporal
      };
      
      setVehicles(prev => [...prev, vehicleWithId]);
      setShowAddForm(false);
      setNewVehicle({
        model: '',
        brand: '',
        year: '',
        color: '',
        plate: '',
        type: 'sedan'
      });
      
      setMessage({ text: 'Vehículo agregado correctamente', type: 'success' });
    } catch (error) {
      console.error('Error al agregar vehículo:', error);
      setMessage({ text: 'Error al agregar el vehículo. Intente nuevamente.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este vehículo?')) return;
    
    try {
      // Aquí iría la lógica para eliminar un vehículo
      // Por ahora simulamos una operación exitosa
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Eliminar el vehículo de la lista local
      setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
      setMessage({ text: 'Vehículo eliminado correctamente', type: 'success' });
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      setMessage({ text: 'Error al eliminar el vehículo. Intente nuevamente.', type: 'error' });
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Vehículos</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Agregar Vehículo
          </button>
        )}
      </div>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
      
      {showAddForm && (
        <div className="mb-8 p-4 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Vehículo</h2>
          <form onSubmit={handleAddVehicle}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="brand">Marca</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={newVehicle.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="model">Modelo</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={newVehicle.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="year">Año</label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={newVehicle.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={newVehicle.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="plate">Placa</label>
                <input
                  type="text"
                  id="plate"
                  name="plate"
                  value={newVehicle.plate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="type">Tipo de Vehículo</label>
                <select
                  id="type"
                  name="type"
                  value={newVehicle.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="sedan">Sedán</option>
                  <option value="suv">SUV</option>
                  <option value="pickup">Pickup</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="van">Van</option>
                  <option value="motorcycle">Motocicleta</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewVehicle({
                    model: '',
                    brand: '',
                    year: '',
                    color: '',
                    plate: '',
                    type: 'sedan'
                  });
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Vehículo'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {vehicles.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map(vehicle => (
                <tr key={vehicle.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vehicle.brand} {vehicle.model}</div>
                    <div className="text-sm text-gray-500">{vehicle.year} - {vehicle.color}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.plate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.type === 'sedan' && 'Sedán'}
                    {vehicle.type === 'suv' && 'SUV'}
                    {vehicle.type === 'pickup' && 'Pickup'}
                    {vehicle.type === 'hatchback' && 'Hatchback'}
                    {vehicle.type === 'van' && 'Van'}
                    {vehicle.type === 'motorcycle' && 'Motocicleta'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No tienes vehículos registrados. Agrega uno para comenzar.
        </div>
      )}
    </div>
  );
};

export default CustomerVehicles;
