import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import type { FileWithPreview } from '../types';

interface DropZoneProps {
  onFileSelect: (file: FileWithPreview) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFileSelect }) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full max-w-xl p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
    >
      <label className="flex flex-col items-center cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <span className="text-lg font-medium text-gray-700">
          Drag and drop your file here
        </span>
        <span className="text-sm text-gray-500 mt-2">
          or click to browse files
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*,video/*"
        />
      </label>
    </div>
  );
};