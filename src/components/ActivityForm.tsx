import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';

const ActivityForm: React.FC = () => {
  const { addActivity } = useFitness();
  const [type, setType] = useState<'steps' | 'workout' | 'calories' | 'sleep'>('steps');
  const [value, setValue] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (value <= 0) return;
    
    addActivity({
      type,
      value,
      notes
    });
    
    // Reset form
    setValue(0);
    setNotes('');
    
    // Show success message
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Log Activity</h2>
      
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          Activity logged successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Activity Type
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <button
              type="button"
              className={`py-2 px-4 rounded-lg text-center ${
                type === 'steps' 
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent'
              }`}
              onClick={() => setType('steps')}
            >
              Steps
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded-lg text-center ${
                type === 'workout' 
                  ? 'bg-purple-100 text-purple-800 border-2 border-purple-300' 
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent'
              }`}
              onClick={() => setType('workout')}
            >
              Workout
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded-lg text-center ${
                type === 'calories' 
                  ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' 
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent'
              }`}
              onClick={() => setType('calories')}
            >
              Calories
            </button>
            <button
              type="button"
              className={`py-2 px-4 rounded-lg text-center ${
                type === 'sleep' 
                  ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300' 
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent'
              }`}
              onClick={() => setType('sleep')}
            >
              Sleep
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
            {type === 'steps' ? 'Steps' : 
             type === 'workout' ? 'Minutes' : 
             type === 'calories' ? 'Calories' : 
             'Hours'}
          </label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            min="0"
            step={type === 'sleep' ? '0.1' : '1'}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Log Activity
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;