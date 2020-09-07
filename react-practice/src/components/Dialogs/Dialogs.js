import React from "react";
import classes from './Dialogs.module.css'
import AllDialogs from "./AllDialogs/AllDialogs";
import DialogsContainer from "./Messages/MessagesContainer";

const Dialogs = (props) => {

    return (
        <div className={classes.dialogs}>

            <AllDialogs dialogs={props.state.dialogsPage.dialogsData}/>

            <DialogsContainer/>
        </div>
    );
};

export default Dialogs;