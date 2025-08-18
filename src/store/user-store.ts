// app/store/auth.ts
"use client";

import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { logout as authLogout } from "../services/authService";

type JwtPayload = {
    email: string;
    id: number;
    role: "admin" | "participant";
    iat: number;
    exp: number;
    iss: string;
};

type AuthState = {
    accessToken: string | null;
    user: JwtPayload | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    refetch: () => void; // optional, for manual refetch

    logout: () => void;
};

// ---- helpers (sync, no effects) ----
const nowSec = () => Math.floor(Date.now() / 1000);

function parseToken(token: string): JwtPayload | null {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded?.exp || decoded.exp <= nowSec()) return null;
        return decoded;
    } catch {
        return null;
    }
}

function readTokenFromStorage(): { token: string | null; user: JwtPayload | null } {
    if (typeof window === "undefined") return { token: null, user: null };
    const token = localStorage.getItem("access_token");
    if (!token) return { token: null, user: null };

    const user = parseToken(token);
    if (!user) {
        localStorage.removeItem("access_token");
        return { token: null, user: null };
    }
    return { token, user };
}

// Preload initial state synchronously (no useEffect)
const initial = readTokenFromStorage();

// ---- store ----
export const userStore = create<AuthState>((set) => ({
    accessToken: initial.token,
    user: initial.user,
    isAuthenticated: !!initial.user,
    isLoading: true,
    refetch: () => {
        const { token, user } = readTokenFromStorage();
        set({
            accessToken: token,
            user,
            isAuthenticated: !!user,
            isLoading: false,
        });
    },

    logout: async () => {
        await authLogout();
        set({ accessToken: null, user: null, isAuthenticated: false });
    },
}));

// ---- keep store in sync across tabs & manual localStorage edits ----
declare global {
    interface Window {
        __authStorageHookInstalled?: boolean;
    }
}

if (typeof window !== "undefined" && !window.__authStorageHookInstalled) {
    window.addEventListener("storage", (e) => {
        if (e.key !== "access_token") return;

        const { token, user } = readTokenFromStorage();
        userStore.setState({
            accessToken: token,
            user,
            isAuthenticated: !!user,
            isLoading: false,
        });
    });
    window.__authStorageHookInstalled = true;
}
