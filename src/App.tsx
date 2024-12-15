import React, { useState, useCallback, useEffect } from 'react';
import { FileType, Share2, Download } from 'lucide-react';
import { DropZone } from './components/DropZone';
import { FormatSelector } from './components/FormatSelector';
import { FilePreview } from './components/FilePreview';
import { ConversionProgress } from './components/ConversionProgress';
import { ThemeToggle } from './components/ThemeToggle';
import { ConversionHistory } from './components/ConversionHistory';
import { ConversionPresets } from './components/ConversionPresets';
import { useDarkMode } from './hooks/useDarkMode';
import type { FileFormat, FileWithPreview, ConversionHistory as ConversionHistoryType, ConversionPreset } from './types';
import { isValidFileType } from './utils/fileHelpers';

function App() {
  const [isDark, toggleDark] = useDarkMode();
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(null);
  const [outputFormat, setOutputFormat] = useState<FileFormat>('png');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<ConversionHistoryType[]>(() => {
    const saved = localStorage.getItem('conversionHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [presets, setPresets] = useState<ConversionPreset[]>(() => {
    const saved = localStorage.getItem('conversionPresets');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Web Image', outputFormat: 'webp', favorite: false },
      { id: '2', name: 'HD Video', outputFormat: 'mp4', favorite: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('conversionPresets', JSON.stringify(presets));
  }, [presets]);

  const handleFileSelect = useCallback((file: File) => {
    if (!isValidFileType(file)) {
      alert('Please select a valid image or video file.');
      return;
    }

    const fileWithPreview = file as FileWithPreview;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        fileWithPreview.preview = reader.result as string;
        setSelectedFile(fileWithPreview);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(fileWithPreview);
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('outputFormat', outputFormat);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Conversion failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted.${outputFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Add to history
      const newConversion: ConversionHistoryType = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        inputFormat: selectedFile.type.split('/')[1],
        outputFormat,
        timestamp: Date.now(),
        fileSize: selectedFile.size,
      };
      setHistory((prev) => [newConversion, ...prev.slice(0, 9)]);

      setProgress(100);
    } catch (error) {
      console.error('Error converting file:', error);
      alert('Error converting file. Please try again.');
    } finally {
      setIsConverting(false);
    }
  }, [selectedFile, outputFormat]);

  const handleShare = useCallback(async () => {
    if (!selectedFile) return;

    try {
      await navigator.share({
        title: 'Converted File',
        text: 'Check out my converted file!',
        files: [selectedFile],
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [selectedFile]);

  const handleKeyboardShortcut = useCallback((e: KeyboardEvent) => {
    if (e.key === 'o' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.querySelector<HTMLInputElement>('input[type="file"]')?.click();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && selectedFile) {
      e.preventDefault();
      handleConvert();
    }
  }, [selectedFile, handleConvert]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleKeyboardShortcut]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark transition-colors">
      <ThemeToggle isDark={isDark} toggle={() => toggleDark(!isDark)} />
      
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileType className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              File Converter
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Convert your files to any format with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 transition-colors">
              {!selectedFile ? (
                <DropZone onFileSelect={handleFileSelect} />
              ) : (
                <div className="space-y-6">
                  <FilePreview
                    file={selectedFile}
                    onRemove={() => setSelectedFile(null)}
                  />
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    <FormatSelector
                      value={outputFormat}
                      onChange={setOutputFormat}
                      label="Convert to"
                    />
                    
                    <div className="flex gap-2">
                      <button
                        onClick={handleConvert}
                        disabled={isConverting}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 
                                 text-white rounded-md hover:bg-blue-600 
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download className="w-4 h-4" />
                        Convert
                      </button>
                      
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 
                                 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                                 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>

                  {isConverting && <ConversionProgress progress={progress} />}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <ConversionPresets
              presets={presets}
              onPresetSelect={(preset) => setOutputFormat(preset.outputFormat)}
              onToggleFavorite={(id) =>
                setPresets((prev) =>
                  prev.map((p) =>
                    p.id === id ? { ...p, favorite: !p.favorite } : p
                  )
                )
              }
            />
            
            <ConversionHistory
              history={history}
              onConversionSelect={(conversion) =>
                setOutputFormat(conversion.outputFormat)
              }
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Keyboard shortcuts:</p>
          <p>Open file: Ctrl/⌘ + O • Convert: Ctrl/⌘ + Enter</p>
        </div>
      </div>
    </div>
  );
}

export default App;