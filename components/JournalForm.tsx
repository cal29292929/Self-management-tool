
import React, { useState, useMemo } from 'react';
import { CbtEntry, CustomField } from '../types';
import { getBalancedThought } from '../services/geminiService';
import { PlusIcon, SparklesIcon, XCircleIcon } from './icons';

interface JournalFormProps {
    addEntry: (entry: Omit<CbtEntry, 'id'>) => void;
    entries: CbtEntry[];
}

const JournalForm: React.FC<JournalFormProps> = ({ addEntry, entries }) => {
    const [situation, setSituation] = useState('');
    const [mood, setMood] = useState('');
    const [rating, setRating] = useState(3);
    const [negativeThought, setNegativeThought] = useState('');
    const [evidenceFor, setEvidenceFor] = useState('');
    const [evidenceAgainst, setEvidenceAgainst] = useState('');
    const [balancedThought, setBalancedThought] = useState('');
    const [customFields, setCustomFields] = useState<CustomField[]>([]);
    
    const [formLoading, setFormLoading] = useState(false);
    const [apiLoading, setApiLoading] = useState(false);
    const [message, setMessage] = useState('');

    const moodSuggestions = useMemo(() => [...new Set(entries.map(e => e.mood).filter(Boolean))], [entries]);

    const clearForm = () => {
        setSituation('');
        setMood('');
        setRating(3);
        setNegativeThought('');
        setEvidenceFor('');
        setEvidenceAgainst('');
        setBalancedThought('');
        setCustomFields([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setMessage('');

        if (!situation || !mood || !negativeThought) {
            setMessage('状況、気分、ネガティブ思考は必須項目です。');
            setFormLoading(false);
            return;
        }
        
        const customData = customFields.reduce((acc, field) => {
            if (field.name && field.value) {
                acc[`custom_${field.name}`] = field.value;
            }
            return acc;
        }, {} as {[key: string]: string});

        addEntry({
            timestamp: new Date().toISOString(),
            situation,
            mood,
            rating,
            negativeThought,
            evidenceFor,
            evidenceAgainst,
            balancedThought,
            ...customData,
        });

        setMessage('思考記録を保存しました！');
        clearForm();
        setFormLoading(false);
        setTimeout(() => setMessage(''), 3000);
    };
    
    const handleGeminiAssist = async () => {
        if (!negativeThought) {
            setMessage('ネガティブ思考を入力してください。');
            return;
        }

        setApiLoading(true);
        setMessage('');
        try {
            const result = await getBalancedThought({ situation, mood, rating, negativeThought });
            setBalancedThought(result);
            setMessage('Geminiがバランスの取れた思考を提案しました！');
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'エラーが発生しました');
        } finally {
            setApiLoading(false);
        }
    };

    const handleAddCustomField = () => {
        setCustomFields([...customFields, { id: Date.now(), name: '', value: '' }]);
    };
    
    const handleRemoveCustomField = (id: number) => {
        setCustomFields(customFields.filter(field => field.id !== id));
    };

    const handleCustomFieldChange = (id: number, fieldName: 'name' | 'value', value: string) => {
        setCustomFields(customFields.map(field => 
            field.id === id ? { ...field, [fieldName]: value } : field
        ));
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">今日の思考記録</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="situation" className="block text-sm font-medium text-gray-700">状況</label>
                        <textarea id="situation" value={situation} onChange={(e) => setSituation(e.target.value)} placeholder="何が起こりましたか？" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 h-24" required />
                    </div>
                    <div>
                        <label htmlFor="negativeThought" className="block text-sm font-medium text-gray-700">ネガティブ思考</label>
                        <textarea id="negativeThought" value={negativeThought} onChange={(e) => setNegativeThought(e.target.value)} placeholder="頭に浮かんだ思考は？" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 h-24" required />
                    </div>
                    <div>
                        <label htmlFor="mood" className="block text-sm font-medium text-gray-700">気分</label>
                        <input id="mood" type="text" value={mood} onChange={(e) => setMood(e.target.value)} placeholder="どんな気分でしたか？" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2" list="mood-suggestions" required />
                        <datalist id="mood-suggestions">
                            {moodSuggestions.map(suggestion => <option key={suggestion} value={suggestion} />)}
                        </datalist>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">気分の評価 (1:最悪 - 5:最高)</label>
                        <div className="flex justify-around items-center bg-gray-50 p-2 rounded-md h-12">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value} className="flex flex-col items-center cursor-pointer">
                                    <input type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"/>
                                    <span className="text-xs mt-1 text-gray-600">{value}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">思考のバランスを見つける</h3>
                    <p className="text-sm text-gray-600 mb-4">ネガティブな思考を客観的に見つめ直してみましょう。</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="evidenceFor" className="block text-sm font-medium text-gray-700">思考を支持する証拠</label>
                            <textarea id="evidenceFor" value={evidenceFor} onChange={(e) => setEvidenceFor(e.target.value)} placeholder="その思考が正しいと思う根拠は？" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 h-24"/>
                        </div>
                        <div>
                            <label htmlFor="evidenceAgainst" className="block text-sm font-medium text-gray-700">思考に反する証拠</label>
                            <textarea id="evidenceAgainst" value={evidenceAgainst} onChange={(e) => setEvidenceAgainst(e.target.value)} placeholder="そうではない根拠はありますか？" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 h-24"/>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="balancedThought" className="block text-sm font-medium text-gray-700">よりバランスの取れた思考</label>
                        <textarea id="balancedThought" value={balancedThought} onChange={(e) => setBalancedThought(e.target.value)} placeholder="両方の証拠を考慮して、新しい考え方を見つけましょう。" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 h-24"/>
                    </div>
                    <button type="button" onClick={handleGeminiAssist} disabled={apiLoading || formLoading} className="w-full flex items-center justify-center space-x-2 bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-colors duration-200 mt-4 disabled:bg-emerald-300 disabled:cursor-not-allowed">
                        <SparklesIcon /><span>{apiLoading ? '提案を作成中...' : 'Geminiに思考のバランスを見つけてもらう'}</span>
                    </button>
                </div>
                
                <div className="border-t pt-6 space-y-3">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">カスタム項目</h3>
                        <button type="button" onClick={handleAddCustomField} className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium">
                           <PlusIcon /><span>追加</span>
                        </button>
                    </div>
                     {customFields.map((field) => (
                        <div key={field.id} className="flex space-x-2 items-center">
                            <input type="text" value={field.name} onChange={(e) => handleCustomFieldChange(field.id, 'name', e.target.value)} placeholder="項目名" className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"/>
                            <input type="text" value={field.value} onChange={(e) => handleCustomFieldChange(field.id, 'value', e.target.value)} placeholder="内容" className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"/>
                            <button type="button" onClick={() => handleRemoveCustomField(field.id)} className="text-gray-400 hover:text-red-500 transition-colors duration-200"><XCircleIcon /></button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-semibold disabled:bg-indigo-400" disabled={formLoading || apiLoading}>
                    {formLoading ? '保存中...' : '記録を保存'}
                </button>
                {message && <div className="mt-2 text-center text-sm text-green-600">{message}</div>}
            </form>
        </div>
    );
};

export default JournalForm;