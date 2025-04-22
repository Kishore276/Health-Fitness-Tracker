export interface Activity {
  id: string;
  type: 'steps' | 'workout' | 'calories' | 'sleep';
  value: number;
  date: string;
  notes?: string;
}

export interface Goal {
  id: string;
  type: 'steps' | 'workout' | 'calories' | 'sleep';
  target: number;
  current: number;
  deadline?: string;
  completed: boolean;
}

export interface User {
  name: string;
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female' | 'other';
}