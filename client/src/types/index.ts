export interface Category {
  id: number;
  name: string;
}

export interface Activity {
  id: string;
  category: number;
  name: string;
  calories: number;
}

export type ActivityState = {
  id?: string;
  category: number;
  name: string;
  calories: number;
}

export type ActivityAction = 
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'UPDATE_ACTIVITY'; payload: Activity }
  | { type: 'SET_EDITING'; payload: Activity | null }
  | { type: 'CLEAR_ACTIVITIES' }; 