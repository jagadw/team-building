import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CameraCapture from "./CameraCapture";
import { useQuery } from "@tanstack/react-query";
import { CheckpointService } from "@/services/checkpointService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { UploadService } from "@/services/upload.api";

type MissionItem = {
    id: number;
    name: string;
    description?: string;
    video?: string;
};

type Checkpoint = {
    id: number;
    name: string;
    description?: string;
    location?: string; // iframe src (maps embed)
    missions: MissionItem[];
};

const Mission: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageData, setImageData] = useState<string | null>(null);
    const [missionId, setMissionId] = useState<number | null>(null);

    const { slugCheckpoint, slug } = useParams();
    const {
        data: resData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["checkpoint", slugCheckpoint, slug],
        queryFn: () => CheckpointService.getCheckpointBySlug(slug!, slugCheckpoint!),
        enabled: Boolean(slug && slugCheckpoint),
    });

    const checkpoint: Checkpoint | undefined = resData?.data;

    useEffect(() => {
        CheckpointService.scanCheckpoint(slugCheckpoint!, slug!).catch(() => null);
    }, [resData]);

    if (!isLoading && !checkpoint && !error) {
        Swal.fire({
            title: "Failed",
            text: "Checkpoint not found",
            icon: "error",
            confirmButtonText: "Okay",
        });
    }

    const selectedMission = useMemo(() => checkpoint?.missions?.find((m) => m.id === missionId) || null, [checkpoint, missionId]);

    const handleCapture = (dataUrl: string) => {
        setImageData(dataUrl);
    };

    // Submit example — adjust to your real API
    const handleSubmit = async () => {
        if (!missionId) {
            await Swal.fire({
                title: "No mission selected",
                text: "Please choose a mission first.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }
        if (!imageData) {
            await Swal.fire({
                title: "Oops",
                text: "Make sure to take a photo first.",
                icon: "warning",
                confirmButtonText: "Got it",
            });
            return;
        }

        try {
            if (!imageData) return;

            const sending = Swal.fire({
                title: "Sending...",
                text: "Uploading your submission...",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const file = new Blob();
            file;
            const upload = UploadService.uploadParticipant();

            // Example: send base64 image to your server
            // const resp = await fetch(`/api/v1/missions/${missionId}/proof`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ imageBase64: imageData }),
            // });

            // if (!resp.ok) {
            //     const msg = await resp.text().catch(() => "");
            //     throw new Error(msg || `Upload failed with status ${resp.status}`);
            // }

            // (await sending).close();
            await Swal.fire({ title: "Sent!", text: "Bukti berhasil dikirim!", icon: "success", confirmButtonText: "Nice" });

            setIsModalOpen(false);
            setImageData(null);
            setMissionId(null);
        } catch (e: any) {
            await Swal.fire({
                title: "Upload failed",
                text: e?.message || "Something went wrong.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    // --- Camera permission helpers ---
    async function tryOpenCameraOnce(): Promise<boolean> {
        try {
            if (!("mediaDevices" in navigator) || !navigator.mediaDevices?.getUserMedia) {
                return false;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach((t) => t.stop());
            return true;
        } catch {
            return false;
        }
    }

    async function ensureCameraPermission(): Promise<boolean> {
        if (window.isSecureContext === false) {
            await Swal.fire({
                title: "Camera blocked",
                html: "This page is not using HTTPS.<br/>Camera access only works on secure origins (https:// or localhost).",
                icon: "error",
                confirmButtonText: "OK",
            });
            return false;
        }

        try {
            if (navigator.permissions && "query" in navigator.permissions) {
                // Some browsers support 'camera'; others may throw.
                const status = await (navigator.permissions as any).query({ name: "camera" as PermissionName });
                if (status.state === "denied") {
                    await Swal.fire({
                        title: "Camera permission denied",
                        html:
                            "Enable camera access for this site in your browser settings and try again.<br/><br/>" +
                            "<small>Tip: In Chrome, click the lock icon → Site settings → Allow Camera.</small>",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    return false;
                }
            }
        } catch {
            // Ignore and fall back to getUserMedia attempt
        }

        const ok = await tryOpenCameraOnce();
        if (!ok) {
            await Swal.fire({
                title: "Cannot access camera",
                html: "Your browser blocked the camera or no camera device is available.<br/>Please allow camera access and try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return false;
        }
        return true;
    }

    async function openModalForMission(m: MissionItem) {
        const allowed = await ensureCameraPermission();
        if (!allowed) return;
        setMissionId(m.id);
        setIsModalOpen(true);
    }
    // --- end helpers ---

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            {isLoading ? (
                "Loading..."
            ) : error ? (
                <Card className="max-w-2xl w-full p-6">
                    <CardTitle className="text-xl mb-2">Error</CardTitle>
                    <CardDescription>Failed to load checkpoint.</CardDescription>
                </Card>
            ) : checkpoint ? (
                <Card className="max-w-2xl w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl">{checkpoint.name}</CardTitle>
                        {checkpoint.description && <CardDescription>{checkpoint.description}</CardDescription>}
                        {checkpoint.location ? (
                            <div className="flex flex-col gap-4">
                                <iframe className="w-full h-48 mt-6 rounded-xl" src={checkpoint.location} allowFullScreen></iframe>
                                <a href={checkpoint.location} target="_blank" className="w-full">
                                    <Button className="w-full">Open map</Button>
                                </a>
                            </div>
                        ) : null}
                    </CardHeader>

                    <CardContent>
                        <h2 className="text-xl font-semibold">Missions</h2>
                        <p className="text-black/65">Complete missions to progress to next checkpoint and earn points</p>

                        <Accordion type="single" collapsible>
                            {checkpoint.missions.map((m) => (
                                <AccordionItem value={`m-${m.id}`} key={m.id}>
                                    <AccordionTrigger className="text-lg font-bold">{m.name}</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-6">
                                        {m.description && <p className="text-black/75">{m.description}</p>}

                                        {m.video ? (
                                            <div className="flex flex-col gap-4">
                                                <div className="aspect-video w-full h-auto">
                                                    <video
                                                        controls
                                                        className="size-full bg-slate-100 overflow-hidden rounded-sm"
                                                        src={`${import.meta.env.VITE_API_BASE_URL}/v1/file/${m.video}`}
                                                    />
                                                </div>
                                            </div>
                                        ) : null}

                                        <div>
                                            <Button className="w-full" onClick={() => openModalForMission(m)}>
                                                Make assignment
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            ) : (
                "No checkpoint"
            )}

            {/* Modal */}
            {isModalOpen && missionId && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-xl space-y-4 relative">
                        <button
                            className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={() => {
                                setIsModalOpen(false);
                                setImageData(null);
                                setMissionId(null);
                            }}
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold">Upload Bukti Misi</h2>
                        {selectedMission && <p className="text-gray-700 font-medium">Mission: {selectedMission.name}</p>}
                        <p className="text-gray-600">Silakan foto langsung untuk bukti pelaksanaan misi:</p>

                        {!imageData ? (
                            <CameraCapture onCapture={handleCapture} />
                        ) : (
                            <div className="w-full h-64 rounded-xl overflow-hidden border-2 border-green-400">
                                <img src={imageData} alt="Captured" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                className="w-1/3"
                                onClick={() => {
                                    setImageData(null);
                                }}
                            >
                                Retake
                            </Button>
                            <Button className="w-2/3" onClick={handleSubmit}>
                                Kirim Bukti
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mission;
