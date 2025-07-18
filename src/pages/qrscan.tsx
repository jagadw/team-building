import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import type { IScannerControls } from '@zxing/browser';

const QRScan: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    codeReader.decodeFromVideoDevice(undefined, videoRef.current!, (result, _error, controls) => {
      if (controlsRef.current === null) {
        controlsRef.current = controls;
      }

      if (result) {
        setResult(result.getText());
        controls?.stop(); // stop scanning
      }
    });

    return () => {
      controlsRef.current?.stop(); // stop camera
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
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
  );
};

export default QRScan;
