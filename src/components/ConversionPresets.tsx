import React from 'react';
import { Bookmark, Star } from 'lucide-react';
import type { ConversionPreset } from '../types';

interface ConversionPresetsProps {
  presets: ConversionPreset[];
  onPresetSelect: (preset: ConversionPreset) => void;
  onToggleFavorite: (presetId: string) => void;
}

export const ConversionPresets: React.FC<ConversionPresetsProps> = ({
  presets,
  onPresetSelect,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Quick Presets
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onPresetSelect(preset)}
            className="relative p-3 rounded-lg bg-gray-50 dark:bg-gray-700 
                     hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {preset.name}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(preset.id);
              }}
              className="absolute top-2 right-2"
            >
              <Star
                className={`w-4 h-4 ${
                  preset.favorite
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
};