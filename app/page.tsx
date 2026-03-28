'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import ImagePreview from '@/components/ImagePreview';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setOriginalImage(URL.createObjectURL(file));
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || '处理失败');
      }

      const blob = await res.blob();
      setProcessedImage(URL.createObjectURL(blob));
    } catch (err) {
      setError((err as Error).message);
      alert('处理失败: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* 标题居中 */}
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          🎨 图片背景移除
        </h1>

        {/* 上传区域居中 */}
        {!originalImage ? (
          <div className="flex justify-center">
            <ImageUpload onUpload={handleImageUpload} />
          </div>
        ) : (
          <ImagePreview
            original={originalImage}
            processed={processedImage}
            loading={loading}
          />
        )}

        {/* 错误提示居中 */}
        {error && (
          <div className="flex justify-center mt-4">
            <p className="text-red-300 bg-red-500/20 px-4 py-2 rounded-lg">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}