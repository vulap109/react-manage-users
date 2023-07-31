import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    // let auth = { token: false };
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute;