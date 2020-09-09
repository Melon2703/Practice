import {logIn} from "./authReducer";

const APP_INITIALIZED = `app/APP-INITIALIZED`

let initialState = {
    initialized: false,
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case APP_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

const appInitialized = () => {
    return {
        type: APP_INITIALIZED
    }
}

export const initial = () => (dispatch) => {
        dispatch(logIn()).then(resolve => {
            console.log(resolve);
        dispatch(appInitialized());
    })
}
