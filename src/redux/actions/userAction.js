import { toast } from 'react-toastify';
import { loginUser } from "../../services/UserService";


export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';

export const userActionLogin = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: "USER_LOGIN" });
        let res = await loginUser({ email: email.trim(), password: password });
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("email", email.trim());
            dispatch({ type: "USER_LOGIN_SUCCESS", payload: { email: email.trim(), token: res.token } });
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
            dispatch({ type: "USER_LOGIN_ERROR" });
        }
    }
}

export const userActionLogout = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "USER_LOGOUT" });
        localStorage.removeItem("token");
        localStorage.removeItem("email");
    }
}

export const userActionRefresh = (email, token) =>{
    return async (dispatch, getState) => {
        dispatch({ type: "USER_REFRESH", payload: {email, token} });
    }
}