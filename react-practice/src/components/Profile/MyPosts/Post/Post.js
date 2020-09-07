import React from "react";
import styles from './Post.module.css';
import cn from "classnames";

const Post = (props) => {
    return (
        <div className={cn(styles.item)}>
            <b>{`Post ${props.id}`}</b>
            <div>
                <span>{props.message}</span>
            </div>
            <hr/>
        </div>
    );
};

export default Post;