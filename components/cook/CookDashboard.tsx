import React, { useState, useEffect } from 'react';
import { CookDashboardData, Meal, MealDecision } from '../../types';
import { getCookData } from '../../services/apiService';
import Card from '../common/Card';
import { MealIcon } from '../common/Icon';

const CookDashboard: React.FC = () => {
  const [data, setData] = useState<CookDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCookData();
        setData(result);
      } catch (err) {
        setError('Failed to load cook data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-center text-red-500">{error || 'No data available'}</div>;
  }

  const eatingCount = data.mealAttendance.filter(a => a.decision === MealDecision.Eating).length;
  const notEatingCount = data.mealAttendance.filter(a => a.decision === MealDecision.NotEating).length;
  const undecidedCount = data.mealAttendance.length - eatingCount - notEatingCount;

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Cook's Dashboard</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card title="Today's Menu" icon={<MealIcon />}>
                    <form className="space-y-4" onSubmit={e => {e.preventDefault(); alert("Menu updated!")}}>
                        {data.todayMenu.map(meal => (
                            <div key={meal.id}>
                                <label className="block text-sm font-medium text-gray-700">{meal.type}</label>
                                <input type="text" defaultValue={meal.menu} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
                            </div>
                        ))}
                        <button type="submit" className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark">Update Menu</button>
                    </form>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card title="Meal Attendance (Lunch)" icon={<MealIcon />}>
                     <div className="flex justify-around mb-4 text-center">
                        <div><p className="text-2xl font-bold text-green-600">{eatingCount}</p><p>Eating</p></div>
                        <div><p className="text-2xl font-bold text-red-600">{notEatingCount}</p><p>Not Eating</p></div>
                        <div><p className="text-2xl font-bold text-gray-500">{undecidedCount}</p><p>Undecided</p></div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        <ul className="divide-y divide-gray-200">
                            {data.mealAttendance.map(({ tenant, decision }) => (
                                <li key={tenant.id} className="py-3 flex justify-between items-center">
                                    <p>{tenant.name} ({tenant.room})</p>
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        decision === MealDecision.Eating ? 'bg-green-100 text-green-800' :
                                        decision === MealDecision.NotEating ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {decision}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default CookDashboard;
