import { Navigate, Outlet } from "react-router-dom";
import { userStore } from "../store/user-store";

type AuthProps = {
	roles?: string[]; // roles to match
	exclude?: boolean; // if true → block these roles instead of allow
	redirectTo?: string; // where to go if not allowed
	children?: React.ReactNode;
};

export function Auth({ roles, exclude = false, redirectTo = "/", children }: AuthProps) {
	const { user, isAuthenticated } = userStore();

	if (!isAuthenticated || !user) {
		return <Navigate to="/" replace />;
	}

	const match = roles ? roles.includes(user.role) : true;
	const allowed = exclude ? !match : match;

	if (!allowed) {
		return <Navigate to={redirectTo} replace />;
	}

	// If you pass children → render them, else fallback to <Outlet /> for routing
	return <>{children ?? <Outlet />}</>;
}
