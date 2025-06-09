import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const CustomerProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleModel: '',
    vehiclePlate: '',
    preferredPaymentMethod: 'credit_card'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  useEffect(() => {
    // Cargar datos del usuario actual
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        vehicleModel: currentUser.vehicleModel || '',
        vehiclePlate: currentUser.vehiclePlate || '',
        preferredPaymentMethod: currentUser.preferredPaymentMethod || 'credit_card'
      });
    }
  }, [currentUser]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });
    
    try {
      // Aquí iría la lógica para actualizar el perfil
      // Por ahora simulamos una actualización exitosa
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el perfil en el contexto de autenticación
      if (updateUserProfile) {
        await updateUserProfile(formData);
      }
      
      setIsEditing(false);
      setMessage({ text: 'Perfil actualizado correctamente', type: 'success' });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setMessage({ text: 'Error al actualizar el perfil. Intente nuevamente.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar Perfil
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
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="vehicleModel">Modelo de Vehículo</label>
            <input
              type="text"
              id="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="vehiclePlate">Placa de Vehículo</label>
            <input
              type="text"
              id="vehiclePlate"
              name="vehiclePlate"
              value={formData.vehiclePlate}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="preferredPaymentMethod">Método de Pago Preferido</label>
            <select
              id="preferredPaymentMethod"
              name="preferredPaymentMethod"
              value={formData.preferredPaymentMethod}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="credit_card">Tarjeta de Crédito</option>
              <option value="debit_card">Tarjeta de Débito</option>
              <option value="cash">Efectivo</option>
              <option value="transfer">Transferencia Bancaria</option>
            </select>
          </div>
        </div>
        
        {isEditing && (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setMessage({ text: '', type: '' });
                // Restaurar datos originales
                if (currentUser) {
                  setFormData({
                    name: currentUser.name || '',
                    email: currentUser.email || '',
                    phone: currentUser.phone || '',
                    vehicleModel: currentUser.vehicleModel || '',
                    vehiclePlate: currentUser.vehiclePlate || '',
                    preferredPaymentMethod: currentUser.preferredPaymentMethod || 'credit_card'
                  });
                }
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomerProfile;
