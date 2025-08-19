// lib/axios.ts
import axios from "axios";

// Create instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const _apiRaw = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken || !refreshToken) {
        if (window.location.href == "/") return config;

        window.location.href = "/";
        return Promise.reject(new Error("No tokens found"));
    }

    // Attach Authorization header
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});
// Continue in lib/axios.ts

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and hasn't retried yet
        if (
            error.response?.status === 401 &&
            !originalRequest._retry // prevent infinite loop
        ) {
            originalRequest._retry = true;

            const accessToken = localStorage.getItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");

            if (!accessToken || !refreshToken) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/";
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/v1/auth/rotate`, {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });

                const { access_token: newAccessToken, refresh_token: newRefreshToken } = res.data;

                // Save new tokens
                localStorage.setItem("access_token", newAccessToken);
                localStorage.setItem("refresh_token", newRefreshToken);

                // Update header and retry
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
