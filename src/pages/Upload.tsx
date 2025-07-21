import React, { useState } from 'react';
import CameraCapture from './CameraCapture.tsx';

const Upload: React.FC = () => {
  const [imageData, setImageData] = useState<string | null>(null);

  const handleCapture = (dataUrl: string) => {
    setImageData(dataUrl);
  };

  const handleSubmit = () => {
    if (!imageData) return alert("Harap ambil foto terlebih dahulu!");
    // TODO: Kirim `imageData` ke backend via fetch/axios (format base64 atau convert ke blob)
    console.log("Mengirim foto:", imageData);
    alert("Bukti berhasil dikirim!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-bold">Upload Bukti Misi</h2>
        <p className="text-gray-600">Silakan foto langsung untuk bukti pelaksanaan misi:</p>

        {!imageData ? (
          <CameraCapture onCapture={handleCapture} />
        ) : (
          <div className="w-full h-64 rounded-xl overflow-hidden border-2 border-green-400">
            <img src={imageData} alt="Captured" className="w-full h-full object-cover" />
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
        >
          Kirim Bukti
        </button>
      </div>
    </div>
  );
};

export default Upload;
