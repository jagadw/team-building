import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import CameraCapture from './CameraCapture';

const Mission: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);

  const handleCapture = (dataUrl: string) => {
    setImageData(dataUrl);
  };

  const handleSubmit = () => {
    if (!imageData) return alert("Harap ambil foto terlebih dahulu!");
    console.log("Mengirim foto:", imageData);
    alert("Bukti berhasil dikirim!");
    setIsModalOpen(false);
    setImageData(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <ProgressBar completed={40} /><br />
        <h2 className="text-2xl font-bold mb-2">Misi</h2>
        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>

        <iframe
          className="w-full h-48 rounded-xl mb-4"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d44619.77245401432!2d115.22191393898179!3d-8.70408705658873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1752932685914!5m2!1sen!2sid"
          allowFullScreen
        ></iframe>

        <a href="https://maps.google.com" target="_blank" className="text-blue-600 underline">
          Lihat lokasi di Google Maps
        </a>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 mb-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Upload Bukti Misi
        </button>
            <Link
              to={`./`}
              className="mt-4 px-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              Next mission
            </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-xl space-y-4 relative">
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => {
                setIsModalOpen(false);
                setImageData(null);
              }}
            >
              ✕
            </button><br />

            <ProgressBar completed={60} />
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
      )}
    </div>
  );
};

export default Mission;
