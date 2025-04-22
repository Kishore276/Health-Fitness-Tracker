import React, { useState } from 'react';
import { FitnessProvider } from './context/FitnessContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ActivityForm from './components/ActivityForm';
import GoalForm from './components/GoalForm';
import ProfileForm from './components/ProfileForm';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'activities':
        return <ActivityForm />;
      case 'goals':
        return <GoalForm />;
      case 'profile':
        return <ProfileForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FitnessProvider>
      <div className="flex h-screen bg-gray-100">
        <div className="w-64 hidden md:block">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        {/* Mobile header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-10 shadow-md p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-gray-800">FitTrack</h1>
            </div>
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="dashboard">Dashboard</option>
                <option value="activities">Log Activity</option>
                <option value="goals">Set Goals</option>
                <option value="profile">Profile</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="md:p-0 p-4 mt-16 md:mt-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </FitnessProvider>
  );
}

export default App;