import React from 'react';
import { Clock, Star } from 'lucide-react';
import type { ConversionHistory } from '../types';

interface ConversionHistoryProps {
  history: ConversionHistory[];
  onConversionSelect: (conversion: ConversionHistory) => void;
}

export const ConversionHistory: React.FC<ConversionHistoryProps> = ({
  history,
  onConversionSelect,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Conversions
        </h2>
      </div>
      <div className="space-y-2">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onConversionSelect(item)}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-100 
                     dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {item.fileName}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {item.inputFormat.toUpperCase()} → {item.outputFormat.toUpperCase()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};