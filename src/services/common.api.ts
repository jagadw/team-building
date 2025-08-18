"use client";

import type { IApiResponse } from "./types.api";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

type ApiErrorResponse = AxiosResponse<Omit<IApiResponse<never>, "data" | "pagination">>;

type HandlerTuple<T, E = Error> = [undefined, E | unknown] | [AxiosResponse<T>, undefined] | [ApiErrorResponse, AxiosError];

export async function axiosHandler<T extends Promise<any>>(res: T): Promise<HandlerTuple<Awaited<T>>> {
    try {
        const data = await res;
        return [data, undefined];
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return [err.response, err];
        }
        return [undefined, err];
    }
}

// export class PortableAxiosResponse<T> extends ApiResponse<T> {
//     constructor(data: AxiosResponse<T>) {
//         super({

//             data,
//         })
//     }
// }
