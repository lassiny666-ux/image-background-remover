'use client';

interface Props {
  original: string;
  processed: string | null;
  loading: boolean;
}

export default function ImagePreview({ original, processed, loading }: Props) {
  const handleDownload = () => {
    if (!processed) return;
    const a = document.createElement('a');
    a.href = processed;
    a.download = 'no-bg.png';
    a.click();
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 原图 */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">原图</h3>
            <div className="bg-gray-100 rounded-xl p-4">
              <img src={original} alt="原图" className="rounded-lg w-full max-h-64 object-contain mx-auto" />
            </div>
          </div>

          {/* 处理后 */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">处理后</h3>
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-purple-600 text-lg font-medium">处理中...</p>
                <p className="text-gray-500 text-sm mt-2">请稍候</p>
              </div>
            ) : processed ? (
              <>
                <div className="bg-gray-100 rounded-xl p-4">
                  <img src={processed} alt="处理后" className="rounded-lg w-full max-h-64 object-contain mx-auto" />
                </div>
                <div className="flex flex-col gap-3 mt-6">
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all"
                  >
                    下载图片
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all"
                  >
                    处理其他图片
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}