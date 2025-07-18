import React from 'react';

const Mission: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-2">Judul Misi</h2>
        <p className="text-gray-600 mb-4">Deskripsi misi lengkap...</p>
        <iframe className="w-full h-48 rounded-xl mb-4" src="https://www.youtube.com/embed/video_id" allowFullScreen></iframe>
        <a href="https://maps.google.com" target="_blank" className="text-blue-600 underline">Lihat lokasi di Google Maps</a>
      </div>
    </div>
  );
};

export default Mission;