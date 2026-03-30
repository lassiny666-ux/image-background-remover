'use client';

interface Props {
  original: string;
  processed: string | null;
  loading: boolean;
  onReset: () => void;
}

export default function ImagePreview({ original, processed, loading, onReset }: Props) {
  const handleDownload = () => {
    if (!processed) return;
    const a = document.createElement('a');
    a.href = processed;
    a.download = 'no-bg.png';
    a.click();
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center">
          <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wide">原图</h3>
          <div className="bg-[#27272a] rounded-xl p-4 aspect-square flex items-center justify-center">
            <img 
              src={original} 
              alt="原图" 
              className="max-w-full max-h-full object-contain rounded-lg" 
            />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wide">处理后</h3>
          {loading ? (
            <div className="bg-[#27272a] rounded-xl p-4 aspect-square flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-purple-400 font-medium">处理中...</p>
            </div>
          ) : processed ? (
            <>
              <div className="bg-[#27272a] rounded-xl p-4 aspect-square flex items-center justify-center">
                <img 
                  src={processed} 
                  alt="处理后" 
                  className="max-w-full max-h-full object-contain rounded-lg" 
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all"
                >
                  下载图片
                </button>
                <button
                  onClick={onReset}
                  className="px-6 py-3 bg-[#27272a] hover:bg-[#3f3f46] text-white font-medium rounded-xl transition-all"
                >
                  重新上传
                </button>
              </div>
            </>
          ) : (
            <div className="bg-[#27272a] rounded-xl p-4 aspect-square flex flex-col items-center justify-center">
              <p className="text-red-400">处理失败</p>
              <button
                onClick={onReset}
                className="mt-4 px-6 py-2 bg-[#3f3f46] hover:bg-[#52525b] text-white text-sm rounded-lg transition-all"
              >
                重试
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
