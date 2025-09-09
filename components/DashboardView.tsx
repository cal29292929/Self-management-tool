
import React from 'react';
import { CbtEntry } from '../types';
import { TrashIcon } from './icons';

interface DashboardViewProps {
    entries: CbtEntry[];
    deleteEntry: (id: string) => void;
    addDummyEntries: () => void;
}

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
};

const EntryCard: React.FC<{entry: CbtEntry; onDelete: (id: string) => void}> = ({entry, onDelete}) => {
    const customFields = Object.entries(entry)
        .filter(([key]) => key.startsWith('custom_'))
        .map(([key, value]) => ({ name: key.replace('custom_', ''), value }));

    return (
        <div className="p-4 border border-gray-200 rounded-lg bg-white relative shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{formatDate(entry.timestamp)}</h3>
                    <div className="flex items-center space-x-2 text-gray-700">
                        <span>気分: {entry.mood}</span>
                        <span className="text-yellow-500 font-bold">
                            {'★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating)}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => onDelete(entry.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                    aria-label="記録を削除"
                >
                    <TrashIcon />
                </button>
            </div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p><strong className="font-medium text-gray-800">状況:</strong> {entry.situation}</p>
                <p><strong className="font-medium text-gray-800">ネガティブ思考:</strong> {entry.negativeThought}</p>
                {entry.balancedThought && <p><strong className="font-medium text-gray-800">バランスの取れた思考:</strong> {entry.balancedThought}</p>}
                {customFields.length > 0 && (
                    <div className="pt-2 border-t mt-2">
                        {customFields.map(field => (
                            <p key={field.name}><strong className="font-medium text-gray-800">{field.name}:</strong> {field.value}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const DashboardView: React.FC<DashboardViewProps> = ({ entries, deleteEntry, addDummyEntries }) => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                 <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">過去の思考記録</h2>
                 <button
                    onClick={addDummyEntries}
                    className="w-full sm:w-auto bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                >
                    テストデータを追加
                </button>
            </div>
            {entries.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <p>まだ記録がありません。</p>
                    <p className="text-sm mt-1">「思考記録」タブから最初の記録を追加しましょう。</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {entries.map((entry) => (
                        <EntryCard key={entry.id} entry={entry} onDelete={deleteEntry} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardView;
