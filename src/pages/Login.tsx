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

    const { isAuthenticated, user } = userStore();
    if (isAuthenticated) {
        const to = user?.role === "admin" ? "/adminmenu" : user?.role === "participant" ? "/next" : ""; // fallback
        return <Navigate to={to} replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const data = await login({ email, password });

            const decoded: JwtPayload = jwtDecode(data.access_token);

            if (decoded.role === "admin") {
                navigate("/adminmenu");
            } else if (decoded.role === "participant") {
                navigate("/scan");
            } else {
                setError("Unknown role");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-sm bg-white p-6 roun ded-2xl shadow-md sm:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">TEAM BUILDING</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
                        required
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
