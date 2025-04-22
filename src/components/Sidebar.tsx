import React from 'react';
import { 
  LayoutDashboard, 
  ActivitySquare, 
  Target, 
  User, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'activities', label: 'Log Activity', icon: <ActivitySquare size={20} /> },
    { id: 'goals', label: 'Set Goals', icon: <Target size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <div className="bg-white h-full shadow-md flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">FitTrack</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {React.cloneElement(item.icon, {
                  className: activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
                })}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <Settings size={20} className="text-gray-500" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <LogOut size={20} className="text-gray-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;