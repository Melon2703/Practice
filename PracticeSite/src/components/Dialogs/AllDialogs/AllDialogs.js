import React from "react";
import classes from './AllDialogs.module.css'
import DialogItem from "./DialogsItem/DialogItem";

const AllDialogs = (props) => {

    let dialogsElements = props.dialogs.map((item)=>{
        return (
            <DialogItem name={item.name} id={item.id}/>
        );
    });

    return (
        <div className={classes.dialogs_items}>
            { dialogsElements }
        </div>
    );
};

export default AllDialogs;