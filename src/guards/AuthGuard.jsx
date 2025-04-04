import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../redux/slices/userSlice";
import {adminRoutes, publicRoutes, userRoutes} from "../routes/routes";

export const AuthGuard = ({ allowedRoles ,redirectPath}) => {
    const user = useSelector(getCurrentUser);
    console.log("Usuario en Redux:", user); // <-- Verifica aquí
    const { token, role,username } = user.user;
    const location = useLocation();
    if (!token) {
        return <Navigate to={publicRoutes.LOGIN} state={{ from: location }} replace />;
    }

    // Si se pasa `redirectPath`, redirige según el rol
    if (redirectPath && token) {
        if (role === "Admin") return <Navigate to={"/admin"} replace />;
        if (role === "Usuario") return <Navigate to={`/${username}`} replace />;
    }
//TODO ARREGLAR HOME Y HACERLA PARA EL USUARIO COMUN

    return allowedRoles?.includes(role) ? (
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
