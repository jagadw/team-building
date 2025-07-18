import React from 'react';

const Upload: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-bold">Upload Bukti Misi</h2>
        <p className="text-gray-600">Silakan foto langsung untuk bukti pelaksanaan misi:</p>
        <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">[Component Kamera Langsung di sini]</p>
        </div>
        <button className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700">Kirim Bukti</button>
      </div>
    </div>
  );
};

export default Upload;