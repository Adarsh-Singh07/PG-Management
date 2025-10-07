
import React from 'react';
import { Meal, MealDecision } from '../types';
import Card from './common/Card';
import { MealIcon } from './common/Icon';

interface MealCardProps {
  meals: Meal[];
  onMealDecisionChange: (mealId: string, decision: MealDecision) => void;
}

const MealItem: React.FC<{ meal: Meal; onDecisionChange: (decision: MealDecision) => void; }> = ({ meal, onDecisionChange }) => {
    return (
        <div className="py-3 sm:py-4">
            <div className="flex items-start space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{meal.type}</p>
                    <p className="text-sm text-gray-500 truncate">{meal.menu}</p>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-2">
                    <button 
                        onClick={() => onDecisionChange(MealDecision.Eating)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition ${meal.decision === MealDecision.Eating ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}>
                        Yes
                    </button>
                    <button
                        onClick={() => onDecisionChange(MealDecision.NotEating)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition ${meal.decision === MealDecision.NotEating ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600 hover:bg-red-50'}`}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

const MealCard: React.FC<MealCardProps> = ({ meals, onMealDecisionChange }) => {
  return (
    <Card title="Today's Meals" icon={<MealIcon />}>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
            {meals.map((meal) => (
                <li key={meal.id}>
                    <MealItem meal={meal} onDecisionChange={(decision) => onMealDecisionChange(meal.id, decision)} />
                </li>
            ))}
        </ul>
      </div>
    </Card>
  );
};

export default MealCard;
