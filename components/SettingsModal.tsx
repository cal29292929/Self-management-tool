
import React, { useState } from 'react';

interface SettingsModalProps {
    currentApiKey: string;
    onSave: (apiKey: string) => void;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ currentApiKey, onSave, onClose }) => {
    const [apiKeyInput, setApiKeyInput] = useState(currentApiKey);

    const handleSave = () => {
        onSave(apiKeyInput);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center" aria-modal="true" role="dialog">
            <div className="relative mx-auto p-8 border w-full max-w-md shadow-lg rounded-xl bg-white">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">APIキー設定</h3>
                    <div className="mt-4 px-7 py-3">
                        <p className="text-sm text-gray-500 mb-4">
                            Gemini APIを利用するために、Google AI Studioで取得したAPIキーを入力してください。
                        </p>
                        <input
                            type="password"
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            placeholder="APIキーを入力"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                            aria-label="API Key"
                        />
                    </div>
                    <div className="items-center px-4 py-3 space-x-4">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-auto hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            保存
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-auto hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            キャンセル
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                        APIキーはあなたのブラウザ内にのみ保存されます。
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
