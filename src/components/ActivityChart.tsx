import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { Line } from 'react-chartjs-2';
import { format, subDays } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart: React.FC = () => {
  const { activities } = useFitness();
  const [selectedType, setSelectedType] = useState<'steps' | 'workout' | 'calories' | 'sleep'>('steps');

  // Generate last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return format(date, 'yyyy-MM-dd');
  });

  const labels = last7Days.map(date => format(new Date(date), 'MMM dd'));

  // Get data for selected activity type
  const data = last7Days.map(date => {
    const dayActivities = activities.filter(a => a.date === date && a.type === selectedType);
    return dayActivities.reduce((sum, activity) => sum + activity.value, 0);
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: selectedType.charAt(0).toUpperCase() + selectedType.slice(1),
        data,
        borderColor: 
          selectedType === 'steps' ? '#3b82f6' : 
          selectedType === 'workout' ? '#8b5cf6' : 
          selectedType === 'calories' ? '#f97316' : 
          '#6366f1',
        backgroundColor: 
          selectedType === 'steps' ? 'rgba(59, 130, 246, 0.1)' : 
          selectedType === 'workout' ? 'rgba(139, 92, 246, 0.1)' : 
          selectedType === 'calories' ? 'rgba(249, 115, 22, 0.1)' : 
          'rgba(99, 102, 241, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Allow height control
    aspectRatio: 2, // Ensure proper width-height balance
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
              if (selectedType === 'sleep') label += ' hrs';
              if (selectedType === 'workout') label += ' min';
            }
            return label;
          }
        }
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Buttons to Select Type */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedType === 'steps' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setSelectedType('steps')}
        >
          Steps
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedType === 'workout' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setSelectedType('workout')}
        >
          Workout
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedType === 'calories' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setSelectedType('calories')}
        >
          Calories
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedType === 'sleep' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setSelectedType('sleep')}
        >
          Sleep
        </button>
      </div>

      {/* Chart Container with Fixed Height */}
      {/* Chart Container with Responsive Width & Fixed Height */}
<div className="w-full max-w-[1000px] h-[250px] mx-auto">
  <Line data={chartData} options={options} />
</div>

    </div>
  );
};

export default ActivityChart;
