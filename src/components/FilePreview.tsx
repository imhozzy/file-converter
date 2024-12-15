import React from 'react';
import { X } from 'lucide-react';
import type { FileWithPreview } from '../types';
import { formatFileSize } from '../utils/fileHelpers';

interface FilePreviewProps {
  file: FileWithPreview;
  onRemove: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  return (
    <div className="relative p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
      <div className="flex items-center gap-4">
        {file.type.startsWith('image/') && file.preview && (
          <img
            src={file.preview}
            alt="Preview"
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <div>
          <p className="font-medium text-gray-900 truncate max-w-xs">
            {file.name}
          </p>
          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
    </div>
  );
};