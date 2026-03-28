'use client';

import { useCallback } from 'react';

interface Props {
  onUpload: (file: File) => void;
}

export default function ImageUpload({ onUpload }: Props) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  }, [onUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="flex justify-center">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-16 text-center cursor-pointer border-4 border-dashed border-purple-300 hover:border-purple-500 hover:bg-white/95 transition-all duration-300 shadow-xl"
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <div className="flex flex-col items-center">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-xl text-gray-700 font-medium">点击或拖拽图片到这里</p>
          <p className="text-sm text-gray-500 mt-2">支持 JPG、PNG、WebP 等格式</p>
        </div>
      </div>
    </div>
  );
}