import { USER_LOGIN, USER_LOGIN_ERROR, USER_LOGIN_SUCCESS } from "../actions/userAction";
const INITIAL_STATE = {
    userState: {
        email: "",
        auth: false,
        token: ""
    },
    isLoading: false,
    isLoginError: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOGIN_SUCCESS:

            return {
                ...state,
                userState: {
                    email: action.payload.email,
                    token: action.payload.token,
                    auth: true
                },
                isLoading: false,
                isLoginError: false
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                userState: {
                    email: "",
                    token: "",
                    auth: false
                },
                isLoading: false,
                isLoginError: true
            }

        default:
            return state;
    }
}
export default userReducer;