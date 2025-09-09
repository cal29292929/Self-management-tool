
import React from 'react';
import { View } from '../types';
import { HomeIcon, PencilSquareIcon, BookOpenIcon, ChartBarIcon, RocketLaunchIcon } from './icons';

interface HeaderProps {
    currentView: View;
    setCurrentView: (view: View) => void;
}

const NavButton: React.FC<{
    label: string;
    view: View;
    currentView: View;
    onClick: (view: View) => void;
    icon: React.ReactNode;
}> = ({ label, view, currentView, onClick, icon }) => (
    <button
        onClick={() => onClick(view)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            currentView === view
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
        }`}
    >
        {icon}
        <span className="hidden sm:inline">{label}</span>
    </button>
);

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
    return (
        <header className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 border border-gray-200">
            <div className="flex items-center space-x-2">
                <span className="text-3xl">🧠</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 tracking-tight">
                    自己管理ノート
                </h1>
            </div>
            <div className="flex items-center space-x-2">
                <nav className="flex space-x-1 sm:space-x-2 flex-wrap justify-center bg-gray-100 p-1 rounded-lg">
                    <NavButton label="ホーム" view={View.Home} currentView={currentView} onClick={setCurrentView} icon={<HomeIcon />} />
                    <NavButton label="思考記録" view={View.Journal} currentView={currentView} onClick={setCurrentView} icon={<PencilSquareIcon />} />
                    <NavButton label="記録を見る" view={View.Dashboard} currentView={currentView} onClick={setCurrentView} icon={<BookOpenIcon />} />
                    <NavButton label="分析" view={View.Analytics} currentView={currentView} onClick={setCurrentView} icon={<ChartBarIcon />} />
                    <NavButton label="目標達成" view={View.Pga} currentView={currentView} onClick={setCurrentView} icon={<RocketLaunchIcon />} />
                </nav>
            </div>
        </header>
    );
};

export default Header;