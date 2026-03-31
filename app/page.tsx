'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import ImageUpload from '@/components/ImageUpload';
import ImagePreview from '@/components/ImagePreview';

export default function Home() {
  const { data: session, status } = useSession();
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
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">BgRemover</span>
          </div>
          
          <div className="flex items-center gap-4">
            {status === 'authenticated' ? (
              <div className="flex items-center gap-3">
                <img 
                  src={session.user?.image || ''} 
                  alt={session.user?.name || ''} 
                  className="w-8 h-8 rounded-full"
                />
                <button 
                  onClick={() => signOut()}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  退出
                </button>
              </div>
            ) : status === 'loading' ? (
              <span className="text-sm text-gray-500">加载中...</span>
            ) : (
              <button 
                onClick={() => signIn('google')}
                className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                使用 Google 登录
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">移除图片背景</h1>
          <p className="text-gray-400 text-lg">智能识别，一键去除图片背景</p>
        </div>

        <div className="bg-[#18181b] rounded-2xl border border-[#27272a] p-8 md:p-12">
          {!originalImage ? (
            <ImageUpload onUpload={handleImageUpload} />
          ) : (
            <ImagePreview
              original={originalImage}
              processed={processedImage}
              loading={loading}
              onReset={handleReset}
            />
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-[#27272a] py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          © 2026 BgRemover. All rights reserved.
        </div>
      </footer>
    </div>
  );
}