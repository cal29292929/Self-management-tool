
import React, { useState } from 'react';
import { PgaGoal, NewPgaGoal, ProgressEntry } from '../types';
import { TrashIcon, CheckCircleIcon, ArrowPathIcon } from './icons';

interface PgaViewProps {
    goals: PgaGoal[];
    addGoal: (goal: NewPgaGoal) => void;
    deleteGoal: (goalId: string) => void;
    updateGoalStatus: (goalId: string, status: '進行中' | '達成') => void;
    addProgressToGoal: (goalId: string, text: string) => void;
}

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
};

const ProgressForm: React.FC<{ goalId: string; addProgress: (goalId: string, text: string) => void }> = ({ goalId, addProgress }) => {
    const [text, setText] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addProgress(goalId, text);
            setText('');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 mt-2">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="進捗を記録..." className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors text-sm font-semibold">記録</button>
        </form>
    );
};


const GoalItem: React.FC<{ 
    goal: PgaGoal; 
    onDelete: (id: string) => void; 
    onUpdateStatus: (id: string, status: '進行中' | '達成') => void;
    onAddProgress: (goalId: string, text: string) => void;
}> = ({ goal, onDelete, onUpdateStatus, onAddProgress }) => {
    const isCompleted = goal.status === '達成';
    return (
        <div className={`p-4 border rounded-lg ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} transition-colors`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className={`text-xl font-semibold ${isCompleted ? 'text-green-800 line-through' : 'text-gray-900'}`}>{goal.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    {goal.targetDate && <p className="text-xs text-gray-500 mt-1">目標日: {goal.targetDate}</p>}
                </div>
                <div className="flex space-x-2 items-center flex-shrink-0">
                    {goal.status === '進行中' ? (
                        <button onClick={() => onUpdateStatus(goal.id, '達成')} className="text-green-600 hover:text-green-800" title="達成"><CheckCircleIcon /></button>
                    ) : (
                        <button onClick={() => onUpdateStatus(goal.id, '進行中')} className="text-yellow-600 hover:text-yellow-800" title="再開"><ArrowPathIcon /></button>
                    )}
                    <button onClick={() => onDelete(goal.id)} className="text-gray-400 hover:text-red-600" title="削除"><TrashIcon /></button>
                </div>
            </div>

            <div className="mt-4">
                <h4 className="font-semibold text-gray-700 text-sm">進捗記録</h4>
                {!isCompleted && <ProgressForm goalId={goal.id} addProgress={onAddProgress} />}
                <div className="mt-2 space-y-1 max-h-40 overflow-y-auto pr-2">
                    {goal.progress.length > 0 ? goal.progress.map(entry => (
                        <div key={entry.id} className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="text-xs text-gray-400 mr-2">{formatDate(entry.timestamp)}:</span> {entry.text}
                        </div>
                    )) : <p className="text-xs text-gray-500 mt-2">まだ進捗がありません。</p>}
                </div>
            </div>
        </div>
    );
};

const PgaView: React.FC<PgaViewProps> = ({ goals, addGoal, deleteGoal, updateGoalStatus, addProgressToGoal }) => {
    const [newGoal, setNewGoal] = useState<NewPgaGoal>({ title: '', description: '', targetDate: '' });

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoal.title) return;
        addGoal(newGoal);
        setNewGoal({ title: '', description: '', targetDate: '' });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">新しい目標を設定する</h2>
                <form onSubmit={handleAddGoal} className="space-y-4">
                    <div>
                        <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700">目標</label>
                        <input id="goalTitle" type="text" value={newGoal.title} onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })} placeholder="達成したいことは何ですか？" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" required />
                    </div>
                    <div>
                        <label htmlFor="goalDesc" className="block text-sm font-medium text-gray-700">説明（任意）</label>
                        <textarea id="goalDesc" value={newGoal.description} onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })} placeholder="目標の詳細や、なぜそれが重要なのかを書きましょう。" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 h-20" />
                    </div>
                    <div>
                        <label htmlFor="goalDate" className="block text-sm font-medium text-gray-700">目標達成日（任意）</label>
                        <input id="goalDate" type="date" value={newGoal.targetDate} onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" />
                    </div>
                    <button type="submit" className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 font-semibold">目標を追加</button>
                </form>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">目標一覧</h2>
                {goals.length === 0 ? (
                    <p className="text-gray-500 text-center py-5">まだ目標が設定されていません。</p>
                ) : (
                    <div className="space-y-4">
                        {goals.map(goal => (
                            <GoalItem key={goal.id} goal={goal} onDelete={deleteGoal} onUpdateStatus={updateGoalStatus} onAddProgress={addProgressToGoal} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PgaView;
