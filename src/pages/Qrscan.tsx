import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import type { IScannerControls } from '@zxing/browser';
import { useNavigate } from 'react-router-dom';

const QRScan: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const navigate = useNavigate(); // ⬅️ hook untuk navigasi

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result, _error, controls) => {
      if (controlsRef.current === null) {
        controlsRef.current = controls;
      }

      if (result) {
        const scannedText = result.getText();
        setResult(scannedText);
        controls?.stop();
      }
    });

    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  // Redirect otomatis ketika result tersedia
  useEffect(() => {
    if (result) {
      // Jika hasilnya URL valid, arahkan langsung
      if (result.startsWith('http://') || result.startsWith('https://')) {
        window.location.href = result;
      } else {
        // Jika bukan URL, arahkan ke route internal (misal /mission/:code)
        navigate(`/mission/${encodeURIComponent(result)}`);
      }
    }
  }, [result, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Scan QR untuk Mulai Misi</h2>

        {!result && (
          <video ref={videoRef} className="w-full max-w-xs aspect-square rounded-xl shadow bg-black" />
        )}

        {result && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-semibold">QR Berhasil Dipindai!</p>
            <p className="break-all">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScan;
