import React from 'react';
import type { FileFormat } from '../types';

interface FormatSelectorProps {
  value: FileFormat;
  onChange: (format: FileFormat) => void;
  label: string;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  value,
  onChange,
  label,
}) => {
  const formats: FileFormat[] = ['jpg', 'png', 'webp', 'mp4', 'avi', 'mov'];

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FileFormat)}
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {formats.map((format) => (
          <option key={format} value={format}>
            {format.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};