import React from 'react';
import demoOutput from '../data/sharkpy_demo.json';

const SharkPyDemo = () => {
    const cells = [
        {
            type: 'input',
            content: 'shark = Shark()\nshark.learn(\n    data=reg_data,\n    target="target",\n    model_choice="linear_regression"\n)',
            count: 1
        },
        {
            type: 'output',
            key: 'step1',
            count: 1
        },
        {
            type: 'input',
            content: '# Let\'s try the Battle Arena!\nshark.battle(\n    data=iris_data,\n    models=["logistic_regression", "random_forest", "xgboost"]\n)',
            count: 2
        },
        {
            type: 'output',
            key: 'step2',
            count: 2
        }
    ];

    const isDark = document.body.classList.contains('dark-mode') ||
        !document.body.classList.contains('light-mode');

    return (
        <div className={`w-full rounded-xl shadow-2xl overflow-hidden text-sm border font-mono my-4 ${isDark ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-300'
            }`}>
            <div className="p-6 pb-4">
                <div className="mb-6 pl-12">
                    <h1 className={`text-xl font-bold mb-2 border-b pb-2 ${isDark ? 'text-gray-100 border-gray-700' : 'text-gray-900 border-gray-300'
                        }`}>
                        SharkPy Tutorial Notebook 🦈
                    </h1>
                    <p className={`leading-relaxed text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Welcome to the interactive demo! SharkPy simplifies machine learning workflows.
                    </p>
                </div>

                {cells.map((cell, index) => (
                    <div key={index} className="mb-5">
                        {cell.type === 'input' ? (
                            <div className="flex gap-2">
                                <div className={`w-12 pt-2 text-right font-mono text-xs select-none font-semibold shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'
                                    }`}>
                                    In [{cell.count}]:
                                </div>
                                <div className={`flex-1 min-w-0 rounded border overflow-hidden ${isDark ? 'bg-[#282c34] border-gray-700' : 'bg-gray-50 border-gray-300'
                                    }`}>
                                    <pre className={`m-0 p-3 text-xs leading-relaxed overflow-x-auto ${isDark ? 'text-gray-300' : 'text-gray-800'
                                        }`} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                        {cell.content}
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2 mt-2">
                                <div className={`w-12 pt-2 text-right font-mono text-xs select-none font-semibold shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'
                                    }`}>
                                    Out[{cell.count}]:
                                </div>
                                <div className={`flex-1 min-w-0 rounded border overflow-hidden ${isDark ? 'bg-[#282c34] border-gray-700' : 'bg-gray-50 border-gray-300'
                                    }`}>
                                    <pre className={`m-0 p-3 text-xs leading-relaxed overflow-x-auto ${isDark ? 'text-gray-300' : 'text-gray-800'
                                        }`} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                        {demoOutput[cell.key]}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SharkPyDemo;
