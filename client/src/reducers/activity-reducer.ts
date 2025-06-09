import { Activity, ActivityAction } from '../types';

export interface ActivityState {
  activities: Activity[];
  editing: Activity | null;
}

const initialState: ActivityState = {
  activities: JSON.parse(localStorage.getItem('activities') || '[]'),
  editing: null
};

export const activityReducer = (state = initialState, action: ActivityAction): ActivityState => {
  switch (action.type) {
    case 'ADD_ACTIVITY': {
      const newState = {
        ...state,
        activities: [...state.activities, action.payload],
        editing: null
      };
      localStorage.setItem('activities', JSON.stringify(newState.activities));
      return newState;
    }
    case 'UPDATE_ACTIVITY': {
      const newState = {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === action.payload.id ? action.payload : activity
        ),
        editing: null
      };
      localStorage.setItem('activities', JSON.stringify(newState.activities));
      return newState;
    }
    case 'SET_EDITING':
      return {
        ...state,
        editing: action.payload
      };
    case 'CLEAR_ACTIVITIES': {
      localStorage.removeItem('activities');
      return {
        ...state,
        activities: [],
        editing: null
      };
    }
    default:
      return state;
  }
}; 