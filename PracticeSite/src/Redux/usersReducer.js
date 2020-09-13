import {usersAPI} from "../API/API";

const CHANGE_FOLLOWING = `user/CHANGE-FOLLOWING`;
const SET_USERS = `user/SET-USERS`;
const CHANGE_CURRENT_PAGE = `user/CHANGE-CURRENT_PAGE`;
const CHANGE_TOTAL_COUNT = `user/CHANGE-TOTAL-COUNT`;
const TOGGLE_IS_FETCHING = `user/TOGGLE-IS-FETCHING`
const TOGGLE_IS_DISABLE = `user/TOGGLE-IS-DISABLE`

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isDisable: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOWING:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {
                            ...u,
                            followed: action.bool,
                        }
                    }
                    return u;
                })
            };

        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            };
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case CHANGE_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            };

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case TOGGLE_IS_DISABLE:

            return {
                ...state,
                isDisable: action.dis ? [...state.isDisable, action.userId] : state.isDisable.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const changeFollowing = (id, bool) => {
    return {
        type: CHANGE_FOLLOWING,
        id: id,
        bool: bool
    }
};

export const changeTotalCount = (count) => {
    return {
        type: CHANGE_TOTAL_COUNT,
        count: count,
    }
}

export const changeCurrentPage = (numb) => {
    return {
        type: CHANGE_CURRENT_PAGE,
        currentPage: numb
    }
}

export const changeFetching = (bool) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: bool,
    }

}

export const changeDisable = (bool, id) => {
    return {
        type: TOGGLE_IS_DISABLE,
        dis: bool,
        userId: id
    }

}

export const setUsers = (users) => ({type: SET_USERS, users});

export const getUsersFromServer = (currentPage) => {
    return async (dispatch, getState) => {
        dispatch(changeFetching(!getState().usersPage.isFetching));
        dispatch(changeCurrentPage(currentPage));
        let data = await usersAPI.getUsers(currentPage, getState().usersPage.pageSize);
        dispatch(setUsers(data.items));
        dispatch(changeTotalCount(data.totalCount));
        dispatch(changeFetching(!getState().usersPage.isFetching));
    }
}

// const followUnfollow = async (dispatch, id, apiMethod)  => {
//     dispatch(changeDisable(true, id));
//     let response = await apiMethod(id);
//     if(response.data.resultCode===0){
//         dispatch(changeFollowing(id, true));
//         dispatch(changeDisable(false, id));
//     }
// }

// export const followUser = (id) => {
//     return (dispatch) => {
//         followUnfollow(dispatch, id, usersAPI.follow);
//     }
// }
//
// export const deleteFollowUser = (id) => {
//     return (dispatch) => {
//         followUnfollow(dispatch, id, usersAPI.deleteFollowing);
//     }
// }

export const followUser = (id) => {
    return (dispatch) => {
        dispatch(changeDisable(true, id));
        usersAPI.follow(id).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeFollowing(id, true));
                dispatch(changeDisable(false, id));
            }
        });
    }
}

export const deleteFollowUser = (id) => {
    return (dispatch) => {
        dispatch(changeDisable(true, id));
        usersAPI.deleteFollowing(id).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeFollowing(id, false));
                dispatch(changeDisable(false, id));
            }
        });
    }
}

export default usersReducer;