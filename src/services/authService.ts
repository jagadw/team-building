import api, { _apiRaw } from "./api";

export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	access_token: string;
	refresh_token: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
	const response = await _apiRaw.post("/v1/auth/login", payload);
	const data = response.data.data;

	localStorage.setItem("access_token", data.access_token);
	localStorage.setItem("refresh_token", data.refresh_token);

	return data;
};

export const logout = async () => {
	const refreshToken = localStorage.getItem("refresh_token");
	const accessToken = localStorage.getItem("access_token");

	await api.post("/v1/auth/logout", {
		refresh_token: refreshToken,
		access_token: accessToken,
	});

	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
	window.location.href = "/";
};
