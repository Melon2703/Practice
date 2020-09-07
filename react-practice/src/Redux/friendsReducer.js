import {getUsersFromServer} from "./usersReducer";
import {usersAPI} from "../API/API";

// const SET_FRIENDS = `SET-FRIENDS`;













// ЛОГИКА АНАЛОГИЧНА ТОМУ, ЧТО ИСПОЛЬЗУЕТСЯ ДЛЯ ЮЗЕРОВ,
// НО НА СЕРВЕРЕ НЕТ ОТДЕЛЬНЫХ ДРУЗЕЙ, ПОЭТОМУ РЕАЛИЗОВАТЬ ЭТО НЕЛЬЗЯ






let initialState = {
    mainFriends: [],
    // firstId : 1,
    // lastId: 1,

};

let friendsReducer = (state=initialState, action) => {
    switch (action.type){
        // case SET_FRIENDS: {
        //     return {
        //         ...state,
        //         mainFriends : [...action.friends],
        //         lastId: action.friends[4].id,
        //         firstId: action.friends[0].id
        //     }
        // }
        default:
            return state;
    }
}

// const setFriends = (friends) => {
//     return {
//         type: SET_FRIENDS,
//         friends
//     }
// }


/*export const getNextFriends = () => {
    let newFriends = [];
    return async (dispatch, getState) => {
        for(let i = 0; i < 5;){

            for(let j = getState().friendsPage.lastId; i < i+1; j++){
               let response = await usersAPI.getUsers(j, 1);
               if(!response.error && response.items[0].followed === true){

                   newFriends.push(response.items[0]);
                   ++i;
               }
            }
        }
        debugger
        dispatch(setFriends(newFriends))
    }
}*/

 export default friendsReducer;