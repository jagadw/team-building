import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { userStore } from "../store/user-store";

interface JwtPayload {
    email: string;
    id: number;
    role: string;
    iat: number;
    exp: number;
    iss: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // const { isAuthenticated, user, refetch } = userStore();
    // refetch();
    // if (isAuthenticated) {
    //     const to = user?.role === "admin" ? "/adminmenu" : user?.role === "participant" ? "/next" : ""; // fallback
    //     refetch();
    //     return <Navigate to={to} replace />;
    // }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const data = await login({ email, password });
            const decoded: JwtPayload = jwtDecode(data.access_token);

            if (decoded.role == "admin") {
                navigate("/adminmenu");
            } else if (decoded.role == "participant") {
                navigate("/next");
            } else {
                setError("Unknown role");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#17202E] px-4">
            <div className="w-full max-w-sm bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-200">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#17202E] drop-shadow-lg">
                TEAM BUILDING
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#17202E] transition"
                    required
                />
                </div>
                <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#17202E] transition"
                    required
                />
                </div>
                {error && (
                <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                )}
                <button
                type="submit"
                className="w-full bg-[#17202E] text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
                >
                Login
                </button>
            </form>
            </div>
        </div>
    );
};

export default Login;
