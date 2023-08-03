import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = useSelector(state => state.user.userState.auth);
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoute;