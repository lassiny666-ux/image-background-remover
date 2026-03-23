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

  return (
    <div className="bg-white rounded-3xl p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">原图</h3>
          <img src={original} alt="原图" className="rounded-xl shadow-lg w-full" />
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">处理后</h3>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-purple-600 text-xl">处理中...</p>
            </div>
          ) : processed ? (
            <>
              <img src={processed} alt="处理后" className="rounded-xl shadow-lg w-full" />
              <button
                onClick={handleDownload}
                className="mt-4 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                下载图片
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
