'use client';

import { useCallback, useRef } from 'react';

interface Props {
  onUpload: (file: File) => void;
}

export default function ImageUpload({ onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

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
    <div className="flex flex-col items-center">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-64 h-64 rounded-full border-4 border-dashed border-gray-600 hover:border-purple-500 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <div className="text-5xl mb-4">📷</div>
        <p className="text-gray-300 font-medium">上传图片</p>
        <p className="text-gray-500 text-sm mt-1">点击或拖拽</p>
      </div>
      <p className="text-gray-500 text-sm mt-8">支持 JPG、PNG、WebP 等格式</p>
    </div>
  );
}
