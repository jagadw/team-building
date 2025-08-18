import { Navigate, Outlet } from "react-router-dom";
import { userStore } from "../store/user-store";

type Perm = "admin" | "participant";

type AuthProps = {
    roles?: Perm[]; // roles to match
    exclude?: boolean; // if true → block these roles instead of allow
    redirectTo?: string; // where to go if not allowed
    children?: React.ReactNode;
};

export function Auth({ roles, exclude = false, redirectTo = "/", children }: AuthProps) {
    const { user, isAuthenticated, isLoading } = userStore();

    if (!isLoading && (!isAuthenticated || !user)) {
        return <Navigate to="/" replace />;
    }

    const match = roles ? roles.includes(user?.role || "participant") : true;
    const allowed = exclude ? !match : match;

    if (!allowed) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children ?? <Outlet />}</>;
}
