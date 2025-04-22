import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Activity, Goal, User } from '../types';
import { format } from 'date-fns';

interface FitnessContextType {
  activities: Activity[];
  goals: Goal[];
  user: User | null;
  addActivity: (activity: Omit<Activity, 'id' | 'date'>) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'current' | 'completed'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  updateUser: (user: User) => void;
  getActivitiesByType: (type: Activity['type']) => Activity[];
  getActivitiesByDate: (date: string) => Activity[];
  getGoalsByType: (type: Goal['type']) => Goal[];
  deleteActivity: (id: string) => void;
  deleteGoal: (id: string) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

const defaultUser: User = {
  name: 'User',
  weight: 70,
  height: 175,
  age: 30,
  gender: 'other',
};

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('fitness_activities');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('fitness_goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('fitness_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  useEffect(() => {
    localStorage.setItem('fitness_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('fitness_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('fitness_user', JSON.stringify(user));
  }, [user]);

  // Update goal progress based on activities
  useEffect(() => {
    if (activities.length > 0) {
      const updatedGoals = goals.map(goal => {
        const relevantActivities = activities.filter(a => a.type === goal.type);
        const current = relevantActivities.reduce((sum, activity) => sum + activity.value, 0);
        
        return {
          ...goal,
          current,
          completed: current >= goal.target
        };
      });
      
      setGoals(updatedGoals);
    }
  }, [activities]);

  const addActivity = (activity: Omit<Activity, 'id' | 'date'>) => {
    const newActivity: Activity = {
      ...activity,
      id: uuidv4(),
      date: format(new Date(), 'yyyy-MM-dd'),
    };
    setActivities(prev => [...prev, newActivity]);
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'current' | 'completed'>) => {
    const newGoal: Goal = {
      ...goal,
      id: uuidv4(),
      current: 0,
      completed: false,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => 
      prev.map(goal => (goal.id === id ? { ...goal, ...updates } : goal))
    );
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const getActivitiesByType = (type: Activity['type']) => {
    return activities.filter(activity => activity.type === type);
  };

  const getActivitiesByDate = (date: string) => {
    return activities.filter(activity => activity.date === date);
  };

  const getGoalsByType = (type: Goal['type']) => {
    return goals.filter(goal => goal.type === type);
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <FitnessContext.Provider
      value={{
        activities,
        goals,
        user,
        addActivity,
        addGoal,
        updateGoal,
        updateUser,
        getActivitiesByType,
        getActivitiesByDate,
        getGoalsByType,
        deleteActivity,
        deleteGoal,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};