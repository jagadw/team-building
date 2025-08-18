// upload.api.ts
import api from "./api";
import type { ApiResponse } from "./types.api";
import type { AxiosProgressEvent } from "axios";

export namespace Req {
    export type Primitive = string | number | boolean;

    export type Options = {
        onUploadProgress?: (e: AxiosProgressEvent) => void;
        signal?: AbortSignal;
    };

    export type Admin = { file: File | Blob; fields?: Record<string, Primitive | Primitive[]> };
    export type AdminVideo = { file: File | Blob; fields?: Record<string, Primitive | Primitive[]> };
    export type Participant = { file: File | Blob; fields?: Record<string, Primitive | Primitive[]> };
}

export namespace Res {
    export type Upload = { filename: string };
}

/** helper: builds form-data with key exactly "file" */
function toFormData(file: File | Blob, fields?: Record<string, Req.Primitive | Req.Primitive[]>) {
    const fd = new FormData();
    const name = file instanceof File && file.name ? file.name : "upload.bin";
    fd.append("file", file, name); // <-- matches Postman key
    if (fields) {
        Object.entries(fields).forEach(([k, v]) => {
            if (Array.isArray(v)) v.forEach((vv) => fd.append(k, String(vv)));
            else fd.append(k, String(v));
        });
    }
    return fd;
}

export namespace UploadService {
    /** POST /v1/admin/upload  -> { data: { filename }, success } */
    export async function uploadAdmin(payload: Req.Admin, opts?: Req.Options): Promise<ApiResponse<Res.Upload>> {
        const res = await api.post<ApiResponse<Res.Upload>>("/v1/admin/upload", toFormData(payload.file, payload.fields), {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: opts?.onUploadProgress,
            signal: opts?.signal,
        });
        return res.data;
    }

    /** POST /v1/admin/upload/video  -> { data: { filename }, success } */
    export async function uploadVideoAdmin(payload: Req.AdminVideo, opts?: Req.Options): Promise<ApiResponse<Res.Upload>> {
        const res = await api.post<ApiResponse<Res.Upload>>("/v1/admin/upload/video", toFormData(payload.file, payload.fields), {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: opts?.onUploadProgress,
            signal: opts?.signal,
        });
        return res.data;
    }

    /** POST /v1/participant/upload  -> { data: { filename }, success } */
    export async function uploadParticipant(payload: Req.Participant, opts?: Req.Options): Promise<ApiResponse<Res.Upload>> {
        const res = await api.post<ApiResponse<Res.Upload>>("/v1/participant/upload", toFormData(payload.file, payload.fields), {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: opts?.onUploadProgress,
            signal: opts?.signal,
        });
        return res.data;
    }

    /** Optional helper if your BE serves files like /v1/file/:filename */
    export function getFileUrl(filename: string) {
        return `/v1/file/${filename}`;
    }
}
