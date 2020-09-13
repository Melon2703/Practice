import {AuthAPI} from "../API/API";
import {stopSubmit} from "redux-form";
import {getUsersFromServer} from "./usersReducer";

const SET_USER_DATA = `auth/CHANGE-FOLLOWING`;
const SET_CAPTCHA = `auth/SET-CAPTCHA`;

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,
    captchaURL: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth,
            };

        case SET_CAPTCHA:
            return {
                ...state,
                captchaURL: action.captchaURL
            }
        default:
            return state;
    }
}

export const setCaptcha = (url) => {
    return {
        type: SET_CAPTCHA,
        captchaURL: url
    }
}

export const setUserData = (id, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login},
        isAuth
    }
};

export const logIn = () => {
    return async (dispatch) => {
        let data = await AuthAPI.logIn();
        if (data.resultCode === 0) {
            let {id, login, email} = data.data;
            dispatch(setUserData(id, email, login, true));
        }
    }
}

export const getLogIn = (logData) => {
    return async (dispatch, getState) => {
        let response = await AuthAPI.getLogIn(logData);
        if (response.data.resultCode === 0) {
            dispatch(logIn()).then(response => {
                dispatch(getUsersFromServer(getState().usersPage.currentPage));
                dispatch(setCaptcha(null));
            });
        } else if (response.data.resultCode === 10) {
            AuthAPI.getCaptcha().then(url => {
                dispatch(setCaptcha(url));
            })
        } else {
            let err = response.data.messages ? response.data.messages[0] : `Some error`;
            dispatch(stopSubmit(`login`, {_error: err}))
        }
    }
}

export const getLogOut = () => {
    return async (dispatch) => {
        let response = await AuthAPI.getLogOut();
        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false));
        }
    }
}


export default authReducer;