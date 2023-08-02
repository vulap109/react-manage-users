import { toast } from 'react-toastify';
import { loginUser } from "../../services/UserService";


export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';


export const USER_LOGOUT = 'USER_LOGOUT';

export const userActionLogin = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: "USER_LOGIN" });
        let res = await loginUser({ email: email.trim(), password: password });
        if (res && res.token) {
            dispatch({ type: "USER_LOGIN_SUCCESS", payload: { email: email.trim(), token: res.token } });
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
            dispatch({ type: "USER_LOGIN_ERROR" });
        }
    }
}