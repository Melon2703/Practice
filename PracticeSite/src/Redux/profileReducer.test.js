import React from "react";
import profileReducer, {addPost, deletePost} from "./profileReducer";

let initialState = {
    postsData: [
        {id: 1, message: `It is my first React-project!`, like_counts: 15},
        {id: 2, message: `Oh, it is cool!`, like_counts: 25},
        {id: 3, message: `Let's do smth new`, like_counts: 20},
        {id: 4, message: `It is interesting)`, like_counts: 5},
        {id: 5, message: `Really`, like_counts: 8}
    ]
};

test('should add new post', () => {
    let action = addPost(`someText`);

    let newState = profileReducer(initialState, action);

    expect(newState.postsData.length).toBe(6);
});

test('new post should contains correct text', () => {
    let action = addPost(`someText`);

    let newState = profileReducer(initialState, action);

    expect(newState.postsData[5].message).toBe(`someText`);
});

test('should delete post', () => {
    let action = deletePost(4);

    let newState = profileReducer(initialState, action);

    expect(newState.postsData.length).toBe(4);
});

test('shouldn not delete post with incorrect id', () => {
    let action = deletePost(1000);

    let newState = profileReducer(initialState, action);

    expect(newState.postsData.length).toBe(5);
});