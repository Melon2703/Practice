import React from "react";
import classes from './Messages.module.css'
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../ComponentsForFields/ComponentsForFields";
import {isValue, maxLength} from "../../../Validators/ValidatorsForForms";



const Messages = (props) => {

    let messagesElements = props.dialogsPage.messagesData.map((item) => {
        return (
            <Message text={item.text} id={item.id}/>
        );
    });

    let onSubmit = (formData) => {
        props.addMessage(formData.newMessage);
    }

    return (
            <div className={classes.messages}>
                {messagesElements}
                <UpdateNewMessageRedux onSubmit={onSubmit} />
            </div>
    );
};

let MaxLength = maxLength(15);
const newMessage = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name='newMessage' validate={[isValue, MaxLength]}/>
            <button>New Message</button>
        </form>
    )
}

const UpdateNewMessageRedux = reduxForm({
    form: `newMessageForm`,
})(newMessage) ;


export default Messages;