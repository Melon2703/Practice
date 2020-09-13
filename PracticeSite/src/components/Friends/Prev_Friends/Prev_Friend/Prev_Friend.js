import React from "react";
import classes from './Prev_Friend.module.css';

const Prev_Friend = (props) => {
    return (
        <div className={classes.prev_Friends}>
            <img src="https://images-na.ssl-images-amazon.com/images/I/31bEY8VT3YL._SY355_.jpg" alt=""/>
            <div>{props.data.name}</div>
        </div>
    );
};

export default Prev_Friend;