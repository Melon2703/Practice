import React from "react";
import styles from './Friend.module.css';
import cn from "classnames";
import image from './../../../assets/images/pic_1171831236_1.png';

const Friend = (props) => {
    return (
        <div className={cn(styles.friend)}>
            <img src={props.photo ? props.photo : image } alt=""/>
            <span>{props.name}</span>
        </div>
    );
};

export default Friend;