import React from 'react';
import { Goal } from '../types';
import { Footprints, Dumbbell, Flame, Moon } from 'lucide-react';

interface GoalProgressProps {
  goal: Goal;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goal }) => {
  const progress = Math.min((goal.current / goal.target) * 100, 100);
  
  const getIcon = () => {
    switch (goal.type) {
      case 'steps':
        return <Footprints className="h-5 w-5 text-blue-500" />;
      case 'workout':
        return <Dumbbell className="h-5 w-5 text-purple-500" />;
      case 'calories':
        return <Flame className="h-5 w-5 text-orange-500" />;
      case 'sleep':
        return <Moon className="h-5 w-5 text-indigo-500" />;
    }
  };
  
  const getColorClass = () => {
    switch (goal.type) {
      case 'steps':
        return 'bg-blue-500';
      case 'workout':
        return 'bg-purple-500';
      case 'calories':
        return 'bg-orange-500';
      case 'sleep':
        return 'bg-indigo-500';
    }
  };

  const getUnit = () => {
    switch (goal.type) {
      case 'steps':
        return '';
      case 'workout':
        return 'min';
      case 'calories':
        return '';
      case 'sleep':
        return 'hrs';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {getIcon()}
          <span className="ml-2 font-medium capitalize">{goal.type}</span>
        </div>
        <span className={`text-sm font-medium ${goal.completed ? 'text-green-600' : 'text-gray-600'}`}>
          {goal.completed ? 'Completed' : `${progress.toFixed(0)}%`}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span>
          {goal.current} / {goal.target} {getUnit()}
        </span>
        {goal.deadline && (
          <span>Due: {goal.deadline}</span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${getColorClass()}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default GoalProgress;