import React from "react";
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {isValue, maxLength} from "../../../Validators/ValidatorsForForms";
import {Textarea} from "../../ComponentsForFields/ComponentsForFields";
import cn from "classnames";

const MyPosts = React.memo((props) => {

    let postsMessages = props.profilePage.postsData.map((item) => {
        return (
            <Post  message={item.message} like_counts={item.like_counts} id={item.id}/>
        );
    });


    let onSubmit = (formData) => {

        props.addPost(formData.addNewPost);

    }

    return (
            <div className={cn(styles.posts)}>
                <hr noshade/>
                    <div>
                        <h2>Мои посты</h2>
                        <AddNewPostRedux onSubmit={onSubmit}/>
                    </div>
                <div className={cn(styles.allPosts)}>
                    {postsMessages}
                </div>
            </div>
    );
});

let MaxLength = maxLength(20);

const addNewPost = (props) => {

    return (
        <form onSubmit={props.handleSubmit} >
            <Field component={Textarea} name='addNewPost' validate={[isValue, MaxLength]}/>
            <div>
                <button className={cn(styles.addPostButton)}>Добавить пост</button>
            </div>
        </form>
    )
}

const AddNewPostRedux = reduxForm({
    form: `addPost`
})(addNewPost);


export default MyPosts;