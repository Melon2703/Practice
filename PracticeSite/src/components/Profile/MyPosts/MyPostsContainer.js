import React from "react";
import {addPost} from "../../../Redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        newPostText: state.profilePage.newPostText,
    }
};


//Cтарая версия mDTP, где callback'и создаются вручную
// let mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewPostText: (text) => {
//             dispatch(updateNewPostTextActionCreator(text))
//         },
//         addPost:() => {
//             dispatch(addPostActionCreator())
//         },
//     }
// };

//Новая версия mDTP, где callback'и создаются автоматически ( используются ИМЕННО AC и TC )
const MyPostsContainer = connect(mapStateToProps, {
    addPost,
})(MyPosts);


export default MyPostsContainer;