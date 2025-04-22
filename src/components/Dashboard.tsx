import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { format } from 'date-fns';
import { Activity, Goal } from '../types';
import { 
  BarChart3, 
  Footprints, 
  Dumbbell, 
  Flame, 
  Moon, 
  Trophy, 
  TrendingUp 
} from 'lucide-react';
import ActivitySummary from './ActivitySummary';
import GoalProgress from './GoalProgress';
import ActivityChart from './ActivityChart';

const Dashboard: React.FC = () => {
  const { activities, goals, user } = useFitness();
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayActivities = activities.filter(a => a.date === today);

  const getActivityTotal = (type: Activity['type']) => {
    return todayActivities
      .filter(a => a.type === type)
      .reduce((sum, a) => sum + a.value, 0);
  };

  const getGoalProgress = (type: Goal['type']) => {
    const goal = goals.find(g => g.type === type);
    if (!goal) return 0;
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name || 'Fitness Enthusiast'}!
        </h1>
        <p className="text-gray-600">
          {format(new Date(), 'EEEE, MMMM do, yyyy')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ActivitySummary 
          title="Steps" 
          value={getActivityTotal('steps')} 
          icon={<Footprints className="h-6 w-6 text-blue-500" />} 
          progress={getGoalProgress('steps')}
          color="blue"
        />
        <ActivitySummary 
          title="Workout (min)" 
          value={getActivityTotal('workout')} 
          icon={<Dumbbell className="h-6 w-6 text-purple-500" />} 
          progress={getGoalProgress('workout')}
          color="purple"
        />
        <ActivitySummary 
          title="Calories" 
          value={getActivityTotal('calories')} 
          icon={<Flame className="h-6 w-6 text-orange-500" />} 
          progress={getGoalProgress('calories')}
          color="orange"
        />
        <ActivitySummary 
          title="Sleep (hrs)" 
          value={getActivityTotal('sleep')} 
          icon={<Moon className="h-6 w-6 text-indigo-500" />} 
          progress={getGoalProgress('sleep')}
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
              Activity Trends
            </h2>
          </div>
          <div className="h-80">
            <ActivityChart />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-gray-600" />
              Goals Progress
            </h2>
          </div>
          <div className="space-y-4">
            {goals.length > 0 ? (
              goals.map(goal => (
                <GoalProgress key={goal.id} goal={goal} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No goals set yet. Add some goals to track your progress!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-gray-600" />
            Recent Activities
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.length > 0 ? (
                activities.slice(0, 5).map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {activity.type === 'steps' && <Footprints className="h-5 w-5 text-blue-500 mr-2" />}
                        {activity.type === 'workout' && <Dumbbell className="h-5 w-5 text-purple-500 mr-2" />}
                        {activity.type === 'calories' && <Flame className="h-5 w-5 text-orange-500 mr-2" />}
                        {activity.type === 'sleep' && <Moon className="h-5 w-5 text-indigo-500 mr-2" />}
                        <span className="capitalize">{activity.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activity.value} {activity.type === 'sleep' ? 'hrs' : activity.type === 'workout' ? 'min' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(activity.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {activity.notes || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No activities recorded yet. Start tracking to see your progress!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;