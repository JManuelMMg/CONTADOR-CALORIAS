import React from 'react';
import { Activity } from '../types';
import { FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivityListProps {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, onEdit }) => {
  // Separar actividades por categoría
  const comidas = activities.filter(activity => activity.category === 1);
  const ejercicios = activities.filter(activity => activity.category === 2);

  // Calcular totales de calorías
  const totalCaloriasComidas = comidas.reduce((total, activity) => total + activity.calories, 0);
  const totalCaloriasEjercicios = ejercicios.reduce((total, activity) => total + activity.calories, 0);
  const balanceCalorias = totalCaloriasComidas - totalCaloriasEjercicios;
  
  // Calcular ganancia/pérdida de peso (3500 calorías = 1 kg)
  const cambioPeso = balanceCalorias / 3500;

  return (
    <div className="mt-8 space-y-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold mb-4"
      >
        Resumen de Actividades
      </motion.h2>

      {/* Sección de Comidas */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-4 rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold mb-3 text-green-600">Comidas</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {comidas.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-between items-center p-2 bg-green-50 rounded"
              >
                <span>{activity.name} - {activity.calories} calorías</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(activity)}
                  className="p-2 text-green-600 hover:text-green-800"
                >
                  <FaEdit size={20} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-3 pt-2 border-t border-green-200">
          <p className="font-semibold text-green-700">
            Total Calorías Comidas: {totalCaloriasComidas}
          </p>
        </div>
      </motion.div>

      {/* Sección de Ejercicios */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-4 rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold mb-3 text-blue-600">Ejercicios</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {ejercicios.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-between items-center p-2 bg-blue-50 rounded"
              >
                <span>{activity.name} - {activity.calories} calorías</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(activity)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <FaEdit size={20} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-3 pt-2 border-t border-blue-200">
          <p className="font-semibold text-blue-700">
            Total Calorías Ejercicios: {totalCaloriasEjercicios}
          </p>
        </div>
      </motion.div>

      {/* Balance de Calorías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold mb-3">Balance de Calorías</h3>
        <div className="space-y-2">
          <p className="text-gray-600">Calorías Consumidas: {totalCaloriasComidas}</p>
          <p className="text-gray-600">Calorías Quemadas: {totalCaloriasEjercicios}</p>
          <p className={`text-lg font-bold ${balanceCalorias >= 0 ? 'text-red-600' : 'text-green-600'}`}>
            Balance: {balanceCalorias} calorías
          </p>
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className={`text-lg font-bold ${cambioPeso >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {cambioPeso >= 0 ? 'Ganancia' : 'Pérdida'} de peso estimada: {Math.abs(cambioPeso).toFixed(2)} kg
            </p>
            <p className="text-sm text-gray-500 mt-1">
              * Basado en que 3500 calorías equivalen aproximadamente a 1 kg de peso
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityList; 