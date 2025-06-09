import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { categories } from '../data/categories';
import { Activity, ActivityState } from '../types';

interface FormProps {
  className?: string;
  editing: Activity | null;
  onAddActivity: (activity: ActivityState) => void;
  onUpdateActivity: (activity: Activity) => void;
}

const initialState: ActivityState = {
  category: 0,
  name: '',
  calories: 0
};

const Form: React.FC<FormProps> = ({ 
  className, 
  editing, 
  onAddActivity, 
  onUpdateActivity 
}) => {
  const [formData, setFormData] = useState<ActivityState>(initialState);

  useEffect(() => {
    if (editing) {
      setFormData(editing);
    } else {
      setFormData(initialState);
    }
  }, [editing]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editing) {
      onUpdateActivity({
        ...formData,
        id: editing.id
      } as Activity);
    } else {
      onAddActivity({
        ...formData,
        id: uuidv4()
      });
    }
    setFormData(initialState);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'category' || name === 'calories' ? Number(value) : value
    }));
  };

  const isFormValid = (): boolean => {
    return formData.category !== 0 && formData.name.trim() !== '' && formData.calories > 0;
  };

  return (
    <div className={className}>
      <h2 className="text-xl font-bold mb-4">
        {editing ? 'Editar Actividad' : 'CONTADOR DE CALORIAS'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category" className="block mb-2">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="0">Seleccione una categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block mb-2">Actividad:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Jugo de Naranja, Ensalada, Pesas, Bicicleta"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="calories" className="block mb-2">Calorías:</label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories || ''}
            onChange={handleChange}
            placeholder="Ej: 300"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {editing ? 'ACTUALIZAR' : 
            formData.category === 1 ? 'GUARDAR COMIDA' : 
            formData.category === 2 ? 'GUARDAR EJERCICIO' : 
            'GUARDAR'}
        </button>
      </form>
    </div>
  );
};

export default Form; 