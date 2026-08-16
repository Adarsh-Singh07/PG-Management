import React, { useState, useEffect } from 'react';
import { User, Meal, Payment, Complaint, Announcement, MealDecision } from '../types';
import { getDashboardData } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import ProfileCard from './ProfileCard';
import MealCard from './MealCard';
import RentCard from './RentCard';
import ComplaintsCard from './ComplaintsCard';
import AnnouncementsCard from './AnnouncementsCard';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getDashboardData(user.id);
                setMeals(data.meals);
                setPayments(data.payments);
                setComplaints(data.complaints);
                setAnnouncements(data.announcements);
            } catch (err) {
                setError('Failed to load dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleMealDecision = (mealId: string, decision: MealDecision) => {
        // In a real app, this would be an API call
        console.log(`Setting meal ${mealId} to ${decision}`);
        setMeals(prevMeals => 
            prevMeals.map(meal => 
                meal.id === mealId ? { ...meal, decision } : meal
            )
        );
    };
    
    const handleAddComplaint = (newComplaint: Complaint) => {
        setComplaints(prev => [newComplaint, ...prev]);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    if (error || !user) {
        return <div className="text-center text-red-500">{error || 'Failed to load tenant data.'}</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
                <ProfileCard user={user} />
            </div>
            <div className="lg:col-span-1 space-y-6">
                <MealCard meals={meals} onMealDecisionChange={handleMealDecision} />
                <RentCard payments={payments} />
            </div>
            <div className="lg:col-span-2 space-y-6">
                 <ComplaintsCard complaints={complaints} onAddComplaint={handleAddComplaint} />
                 <AnnouncementsCard announcements={announcements} />
            </div>
        </div>
    );
};

export default Dashboard;
