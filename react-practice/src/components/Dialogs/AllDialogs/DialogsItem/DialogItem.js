import React from "react";
import classes from './DialogItem.module.css'
import {NavLink} from "react-router-dom";
import image from './../../../../assets/images/pic_1171831236_1.png'

const DialogItem = (props) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <img src={image} alt=""/>
            <NavLink to={'/messages/' + props.id}>{props.name}</NavLink>
        </div>
    );
};

export default DialogItem;