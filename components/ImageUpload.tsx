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
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="bg-white rounded-3xl p-20 text-center cursor-pointer border-4 border-dashed border-purple-400 hover:bg-purple-50 transition"
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <p className="text-xl text-gray-600">点击或拖拽图片到这里</p>
    </div>
  );
}
