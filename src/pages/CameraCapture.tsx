import React, { useEffect, useRef, useState } from 'react';

const CameraCapture: React.FC<{ onCapture: (dataUrl: string) => void }> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    //TODO: remove after streaming is used
    console.log(streaming)
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStreaming(true);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
    return () => {
      if (videoRef.current?.srcObject instanceof MediaStream) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onCapture(dataUrl);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl overflow-hidden relative">
        <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover rounded-xl" />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <button
        onClick={handleCapture}
        className="mt-2 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
      >
        Ambil Foto
      </button>
    </div>
  );
};

export default CameraCapture;
