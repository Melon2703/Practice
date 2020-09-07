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

    const MyPostsContainer = connect(mapStateToProps, {
        addPost,
    })(MyPosts);



export default MyPostsContainer;