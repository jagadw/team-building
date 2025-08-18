// import { z } from "zod";
// import config from "@pkg/config";

const DEFAULT_PAGE = 5;

export interface IPaginationOptions {
    page?: number;
    page_size?: number;
}

// Promise<{ users: Res.GetAllUsers; pagination?: any }>;

export interface IPagination {
    page: number;
    total_size: number;
    total_count: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}

export class Pagination implements IPagination {
    page: number;
    total_size: number;
    total_count: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;

    constructor(options: IPaginationOptions, totalCount: number) {
        this.page = options.page || 1;
        this.total_size = options.page_size || DEFAULT_PAGE;
        this.total_count = totalCount;
        this.total_pages = Math.ceil(totalCount / this.total_size);
        this.has_next = this.page < this.total_pages;
        this.has_prev = this.page > 1;
    }
}

export type PaginationResult<T extends any[]> = {
    data: T;
    pagination?: IPagination;
};

export interface IApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: string[];
    pagination?: IPagination;
}

export type SelectRowPrisma<T> = Partial<Record<keyof T, boolean>>;
export type Nullable<T> = null extends T ? Exclude<T, null> | undefined | null : T;
export type NullableRecord<T> = {
    [P in keyof T]: Nullable<T[P]>;
};

export type NonNullableFields<T> = {
    [K in keyof T]: Exclude<T[K], undefined | null>;
};

type FirstUnion<T> = T extends [infer V, ...any] ? V : never;
export type WhereStatement<T extends (...f: any[]) => any> = FirstUnion<Parameters<T>[0]["where"]>;

export class ApiResponse<V> implements IApiResponse<V> {
    message?: string;
    data?: V;
    errors?: string[] | undefined;
    pagination?: IPagination | undefined;
    success: boolean;

    private _status: number = 200;
    private _headers: ResponseInit["headers"];

    constructor(api: IApiResponse<V>) {
        this.message = api.message;
        this.data = api.data;
        this.success = api.success;
        this.errors = api.errors;
        this.pagination = api.pagination;
    }

    status(v: number) {
        this._status = v;
        return this;
    }

    headers(v: ResponseInit["headers"]) {
        this._headers = v;
        return this;
    }

    toJSON() {
        return Response.json(
            {
                success: this.success,
                message: this.message,
                data: this.data,
                pagination: this.pagination,
                errors: this.errors,
            } satisfies IApiResponse<V>,
            { headers: this._headers, status: this._status }
        );
    }
}
