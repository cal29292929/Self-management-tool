
import React from 'react';

const HomeView: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 text-gray-700 space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800">アプリの使い方</h2>
            <p>このアプリは、<strong className="text-indigo-600">自己管理</strong>と<strong className="text-indigo-600">認知行動療法（CBT）</strong>の考え方を使って、日々の出来事や心の状態を整理するのを助けます。</p>
            <div className="space-y-3 pt-2">
                <div className="p-4 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-indigo-800">📝 思考記録</h3>
                    <p className="text-sm text-indigo-700">ネガティブな気持ちになった時の<strong className="font-semibold">状況</strong>、<strong className="font-semibold">気分</strong>、<strong className="font-semibold">思考</strong>を記録します。そして、その思考を客観的に見つめ直し、<strong className="font-semibold">より現実的でバランスの取れた考え方</strong>を見つける手助けをします。</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg">
                    <h3 className="font-semibold text-emerald-800">📈 分析</h3>
                    <p className="text-sm text-emerald-700">これまでの記録を振り返り、自分自身の傾向を理解する手助けをします。Gemini AIによる分析で、新たな気づきを得られるかもしれません。</p>
                </div>
                 <div className="p-4 bg-sky-50 rounded-lg">
                    <h3 className="font-semibold text-sky-800">🚀 目標達成 (PGA)</h3>
                    <p className="text-sm text-sky-700">ポジティブな目標を設定し、達成に向けた進捗を記録します。小さな成功を積み重ねて、自己肯定感を高めましょう。</p>
                </div>
            </div>
            <p className="pt-4 text-center text-sm text-gray-500">
                さあ、まずは「思考記録」から始めてみましょう。
            </p>
        </div>
    );
};

export default HomeView;
