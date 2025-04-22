import React from 'react';

interface ActivitySummaryProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  progress: number;
  color: 'blue' | 'purple' | 'orange' | 'indigo';
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ 
  title, 
  value, 
  icon, 
  progress,
  color 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'purple':
        return 'bg-purple-100 text-purple-800';
      case 'orange':
        return 'bg-orange-100 text-orange-800';
      case 'indigo':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500';
      case 'purple':
        return 'bg-purple-500';
      case 'orange':
        return 'bg-orange-500';
      case 'indigo':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>
          {icon}
        </div>
        <span className="text-xs font-medium text-gray-500">{progress.toFixed(0)}% of goal</span>
      </div>
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <div className="mt-1">
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div 
          className={`h-2 rounded-full ${getProgressColorClasses()}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ActivitySummary;