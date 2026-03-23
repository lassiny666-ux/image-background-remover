'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import ImagePreview from '@/components/ImagePreview';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setOriginalImage(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('处理失败');

      const blob = await res.blob();
      setProcessedImage(URL.createObjectURL(blob));
    } catch (error) {
      alert('处理失败: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🎨 图片背景移除
        </h1>

        {!originalImage ? (
          <ImageUpload onUpload={handleImageUpload} />
        ) : (
          <ImagePreview
            original={originalImage}
            processed={processedImage}
            loading={loading}
          />
        )}
      </div>
    </main>
  );
}
