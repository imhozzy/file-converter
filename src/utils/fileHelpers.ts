export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const isValidFileType = (file: File): boolean => {
  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/avi',
    'video/quicktime'
  ];
  return validTypes.includes(file.type);
};