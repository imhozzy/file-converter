export type FileFormat = 'jpg' | 'png' | 'webp' | 'mp4' | 'avi' | 'mov';

export interface ConversionOptions {
  inputFormat: FileFormat;
  outputFormat: FileFormat;
}

export interface FileWithPreview extends File {
  preview?: string;
}

export interface ConversionHistory {
  id: string;
  fileName: string;
  inputFormat: string;
  outputFormat: FileFormat;
  timestamp: number;
  fileSize: number;
}

export interface ConversionPreset {
  id: string;
  name: string;
  outputFormat: FileFormat;
  favorite: boolean;
}