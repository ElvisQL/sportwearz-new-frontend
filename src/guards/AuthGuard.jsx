import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../redux/slices/userSlice";
import {adminRoutes, publicRoutes, userRoutes} from "../routes/routes";

export const AuthGuard = ({ allowedRoles ,redirectPath}) => {
    const user = useSelector(getCurrentUser);
    const { token, role } = user.user;
    const location = useLocation();

    // Si se pasa `redirectPath`, redirige según el rol
    if (redirectPath && token) {
        if (role === "admin") return <Navigate to={adminRoutes.HOME} replace />;
        if (role === "user") return <Navigate to={userRoutes.HOME} replace />;
    }


    return allowedRoles.includes(role) ? (
        <Outlet />
    ) : token ? (
        <Navigate
            to={publicRoutes.UNAUTHORIZED}
            state={{ from: location }}
            replace
        />
    ) : (
        <Navigate to={publicRoutes.LOGIN} state={{ from: location }} replace />
    );
};
