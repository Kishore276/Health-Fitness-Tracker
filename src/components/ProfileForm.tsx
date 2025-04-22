import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { User } from '../types';

const ProfileForm: React.FC = () => {
  const { user, updateUser } = useFitness();
  const [formData, setFormData] = useState<User>(user || {
    name: '',
    weight: 0,
    height: 0,
    age: 0,
    gender: 'other'
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'gender' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
      
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          Profile updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-2">
            BMI: {formData.weight > 0 && formData.height > 0 
              ? (formData.weight / Math.pow(formData.height / 100, 2)).toFixed(1) 
              : 'N/A'}
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;