import {createSelector} from "reselect";

export const getUsers = (state) => {
    return state.usersPage.users
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}



const getIsFetchingSelector = (state) => {
    return state.usersPage.isFetching
}

export const getIsFetching = createSelector(getIsFetchingSelector,(isFetching) => {
    return isFetching;
});



export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getPhotos = (state) => {
    return state.usersPage.photos
}
export const getIsDisable = (state) => {
    return state.usersPage.isDisable
}