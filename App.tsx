
import React, { useState, useCallback, useEffect } from 'react';
import { View, CbtEntry, PgaGoal, CustomField, NewPgaGoal } from './types';
import Header from './components/Header';
import HomeView from './components/HomeView';
import JournalForm from './components/JournalForm';
import DashboardView from './components/DashboardView';
import AnalyticsView from './components/AnalyticsView';
import PgaView from './components/PgaView';
import { DUMMY_ENTRIES } from './constants';

export default function App() {
    const [currentView, setCurrentView] = useState<View>(View.Home);
    const [entries, setEntries] = useState<CbtEntry[]>([]);
    const [goals, setGoals] = useState<PgaGoal[]>([]);

    const addEntry = useCallback((entry: {
        timestamp: string;
        situation: string;
        mood: string;
        rating: number;
        negativeThought: string;
        evidenceFor?: string;
        evidenceAgainst?: string;
        balancedThought?: string;
        customFields?: CustomField[];
        [key: string]: any;
    }) => {
        const newEntry: CbtEntry = {
            ...entry,
            id: Date.now().toString(),
        };
        setEntries(prev => [newEntry, ...prev]);
    }, []);

    const deleteEntry = useCallback((id: string) => {
        if (window.confirm('この記録を削除してもよろしいですか？')) {
            setEntries(prev => prev.filter(entry => entry.id !== id));
        }
    }, []);

    const addDummyEntries = useCallback(() => {
        const entriesWithIds: CbtEntry[] = DUMMY_ENTRIES.map((entry, index): CbtEntry => {
            const timestamp = new Date();
            const randomDays = Math.floor(Math.random() * 60);
            timestamp.setDate(timestamp.getDate() - randomDays);
            return {
                ...entry,
                id: `dummy-${Date.now()}-${index}`,
                timestamp: timestamp.toISOString(),
            };
        });
        setEntries(prev => [...entriesWithIds, ...prev].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }, []);

    const addGoal = useCallback((goal: NewPgaGoal) => {
        const newGoal: PgaGoal = {
            ...goal,
            id: `goal-${Date.now()}`,
            status: '進行中',
            createdAt: new Date().toISOString(),
            progress: [],
        };
        setGoals(prev => [newGoal, ...prev]);
    }, []);

    const deleteGoal = useCallback((goalId: string) => {
        if (window.confirm('この目標と関連するすべての進捗記録を削除してもよろしいですか？')) {
            setGoals(prev => prev.filter(goal => goal.id !== goalId));
        }
    }, []);

    const updateGoalStatus = useCallback((goalId: string, status: '進行中' | '達成') => {
        setGoals(prev => prev.map(goal => goal.id === goalId ? { ...goal, status } : goal));
    }, []);

    const addProgressToGoal = useCallback((goalId: string, text: string) => {
        setGoals(prev => prev.map(goal => {
            if (goal.id === goalId) {
                const newProgress = {
                    id: `progress-${Date.now()}`,
                    timestamp: new Date().toISOString(),
                    text,
                };
                return { ...goal, progress: [newProgress, ...goal.progress] };
            }
            return goal;
        }));
    }, []);


    const renderContent = () => {
        switch (currentView) {
            case View.Journal:
                return <JournalForm addEntry={addEntry} entries={entries} />;
            case View.Dashboard:
                return <DashboardView entries={entries} deleteEntry={deleteEntry} addDummyEntries={addDummyEntries} />;
            case View.Analytics:
                return <AnalyticsView entries={entries} />;
            case View.Pga:
                return <PgaView
                    goals={goals}
                    addGoal={addGoal}
                    deleteGoal={deleteGoal}
                    updateGoalStatus={updateGoalStatus}
                    addProgressToGoal={addProgressToGoal}
                />;
            case View.Home:
            default:
                return <HomeView />;
        }
    };

    return (
        <div className="font-sans bg-gray-50 min-h-screen p-4 sm:p-8 flex flex-col items-center" style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}>
            <div className="w-full max-w-4xl space-y-8">
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                <main>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}