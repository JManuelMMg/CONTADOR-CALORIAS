import { useReducer } from 'react';
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";
import { activityReducer } from './reducers/activity-reducer';
import { Activity, ActivityState } from './types';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [state, dispatch] = useReducer(activityReducer, {
    activities: JSON.parse(localStorage.getItem('activities') || '[]'),
    editing: null
  });

  const handleAddActivity = (activityData: ActivityState) => {
    // Verificar si ya existe una actividad con el mismo nombre y categoría
    const exists = state.activities.some(
      activity => 
        activity.name.toLowerCase() === activityData.name.toLowerCase() && 
        activity.category === activityData.category
    );

    if (exists) {
      alert('Ya existe una actividad con este nombre en esta categoría');
      return;
    }

    dispatch({ 
      type: 'ADD_ACTIVITY', 
      payload: activityData as Activity 
    });
  };

  const handleUpdateActivity = (activity: Activity) => {
    // Verificar si ya existe otra actividad con el mismo nombre y categoría
    const exists = state.activities.some(
      existingActivity => 
        existingActivity.name.toLowerCase() === activity.name.toLowerCase() && 
        existingActivity.category === activity.category &&
        existingActivity.id !== activity.id
    );

    if (exists) {
      alert('Ya existe una actividad con este nombre en esta categoría');
      return;
    }

    dispatch({ 
      type: 'UPDATE_ACTIVITY', 
      payload: activity 
    });
  };

  const handleEdit = (activity: Activity) => {
    dispatch({ 
      type: 'SET_EDITING', 
      payload: activity 
    });
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todas las actividades?')) {
      dispatch({ type: 'CLEAR_ACTIVITIES' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <Form 
          className="bg-white shadow-lg rounded-lg p-6" 
          editing={state.editing}
          onAddActivity={handleAddActivity}
          onUpdateActivity={handleUpdateActivity}
        />
        <AnimatePresence>
          {state.activities.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ActivityList 
                activities={state.activities}
                onEdit={handleEdit}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearAll}
                className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
              >
                Eliminar Todas las Actividades
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
