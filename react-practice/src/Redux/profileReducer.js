import {profileAPI} from "../API/API";
import {stopSubmit} from "redux-form";

const ADD_POST = `profile/ADD-POST`;
const SET_USER_PROFILE = `profile/SET-USER-PROFILE`;
const SET_STATUS = `profile/SET-STATUS`;
const DELETE_POST = `profile/DELETE-POST`;
const SET_PHOTO = `profile/SET-PHOTO`;

let initialState = {
    postsData: [],
    user: null,
    status: ``,
};


 const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.postsData.length + 1,
                message: action.text,
                like_counts: 0,
            };

            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        }

        case SET_USER_PROFILE:{
            return {
                ...state,
                user: action.user
            }
        }

        case SET_STATUS:{

            return {
                ...state,
                status: action.status
            }
        }

        case DELETE_POST: {

            return {
                ...state,
                postsData: state.postsData.filter(item => item.id !== action.id)
            }
        }

        case SET_PHOTO: {

            return  {
                ...state,
                user : {...state.user, photos : action.photos}
            }
        }

        default:
            return state;
    }
 }


 export const savePhoto = (photos) => {
     return {
         type: SET_PHOTO,
         photos
     }
 }

export const addPost = (text) => {
    return {
        type: ADD_POST,
        text
    }
};

export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    }
}

export const setUserProfile = (user) => {
    return {
        type: SET_USER_PROFILE,
        user,
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}

export const getStatus = (id) => {
    return async (dispatch) => {
       let response =  await profileAPI.getStatus(id);
            dispatch(setStatus(response.data));
    }
}

export const setStatusTC = (status) => {
    return (dispatch) => {
        profileAPI.setStatus(status)
            .then(response => {
            dispatch(setStatus(status))
        })
    }
}

export const getUser = (userId) => {
    return async (dispatch, getState) => {

      let data = await profileAPI.setUser(userId);
                dispatch(setUserProfile(data));
    }
}

export const setPhoto = (photoFile) => {
    return async (dispatch) => {
        let response = await profileAPI.loadPhoto(photoFile);
            if(response.data.resultCode === 0){
                dispatch(savePhoto(response.data.data.photos))
            }
    }
}

export const setMyData = (myData) => {
    return async (dispatch, getState) => {
        let response = await profileAPI.changeMyData(myData);
            if(response.data.resultCode === 0){
                dispatch(getUser(getState().auth.id));
            } else {
                dispatch(stopSubmit(`ProfileForm`, {_error: response.data.messages[0]}));
                return Promise.reject();
            }
    }
}

export default profileReducer;