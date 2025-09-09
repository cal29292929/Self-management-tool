
import React, { useState, useMemo } from 'react';
import { CbtEntry } from '../types';
import { getEntriesAnalysis } from '../services/geminiService';
import { ChartBarIcon, SparklesIcon } from './icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatDateForChart = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
};

const AnalyticsView: React.FC<{ entries: CbtEntry[] }> = ({ entries }) => {
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [geminiAnalysisResult, setGeminiAnalysisResult] = useState('');
    const [message, setMessage] = useState('');

    const { totalEntries, moodCounts, chartData } = useMemo(() => {
        const total = entries.length;
        const counts = entries.reduce((acc, entry) => {
            const mood = entry.mood || '不明';
            acc[mood] = (acc[mood] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const data = [...entries]
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
            .map(entry => ({
                date: formatDateForChart(entry.timestamp),
                rating: entry.rating || 0,
                mood: entry.mood,
            }));

        return { totalEntries: total, moodCounts: counts, chartData: data };
    }, [entries]);

    const handleGeminiAnalysis = async () => {
        if (entries.length === 0) {
            setMessage('分析には記録が必要です。');
            return;
        }

        setAnalysisLoading(true);
        setGeminiAnalysisResult('');
        setMessage('');

        try {
            const result = await getEntriesAnalysis(entries);
            setGeminiAnalysisResult(result);
            setMessage('Geminiが記録を分析しました！');
        } catch (error) {
            setMessage(error instanceof Error ? error.message : '分析中にエラーが発生しました');
        } finally {
            setAnalysisLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 space-y-8">
            <div className="flex items-center space-x-3">
                <ChartBarIcon className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">記録の分析</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700">記録の概要</h3>
                    <p className="text-gray-600 mt-2">記録総数: <span className="font-bold text-lg text-indigo-600">{totalEntries}</span> 件</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700">気分の傾向</h3>
                    {Object.keys(moodCounts).length > 0 ? (
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                            {Object.entries(moodCounts).map(([mood, count]) => (
                                <li key={mood} className="text-gray-600"><span className="font-medium text-gray-800">{mood}</span>: {count}回</li>
                            ))}
                        </ul>
                    ) : <p className="text-gray-500 text-sm mt-2">データがありません</p>}
                </div>
            </div>

            {entries.length > 1 && (
                <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">気分の推移グラフ</h3>
                    <div style={{ width: '100%', height: 300 }}>
                         <ResponsiveContainer>
                            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" fontSize={12} />
                                <YAxis domain={[0, 5]} allowDecimals={false} ticks={[1, 2, 3, 4, 5]} fontSize={12} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="rating" name="気分評価" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
            
            <div className="border-t pt-6 space-y-4">
                <div className="flex items-center space-x-2">
                    <SparklesIcon className="text-emerald-500" />
                    <h3 className="text-xl font-semibold text-gray-800">Geminiによる分析とアドバイス</h3>
                </div>
                <p className="text-sm text-gray-600">過去10件の記録をもとに、傾向とアドバイスを提案します。</p>
                <button
                    onClick={handleGeminiAnalysis}
                    disabled={analysisLoading || entries.length === 0}
                    className="w-full flex items-center justify-center space-x-2 bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-colors duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed"
                >
                    <span>{analysisLoading ? '分析中...' : '記録を分析してもらう'}</span>
                </button>
                {geminiAnalysisResult && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: geminiAnalysisResult.replace(/\n/g, '<br />') }}>
                    </div>
                )}
                {message && <div className="mt-2 text-center text-sm text-green-600">{message}</div>}
            </div>
        </div>
    );
};

export default AnalyticsView;