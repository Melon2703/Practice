import React from "react";
import classes from './Prev_Friends.module.css';
import Prev_Friend from "./Prev_Friend/Prev_Friend";

const Prev_Friends = (props) => {

    let friends = props.state.map((item) => {
        return (
            <Prev_Friend data={item}/>
        );
    });
    return (
        <div>
            {friends}
        </div>
    );
};

export default Prev_Friends;