import React from "react";
import {Field, reduxForm, stopSubmit} from "redux-form";
import {createComponent, Input} from "../../ComponentsForFields/ComponentsForFields";
import styles from "./ProfileForm.module.css";
import cn from "classnames";
import {connect} from "react-redux";


const ProfileForm = (props) => {

    return (
            <form onSubmit={props.handleSubmit} className={cn(styles.profileForm)}>
                {props.error && <div>{props.error}</div>}
                <div>
                    <b>Имя</b> {createComponent(Input, `fullName`, `Введите свое имя`)}
                </div>
                <div>
                    <b>В поиске работы</b> {createComponent(Input, `lookingForAJob`, ``, null, {type: `checkbox`})}
                </div>
                <div>
                    <b>Описание работы</b> {createComponent(Input, `lookingForAJobDescription`, `Какая работа вас интересует`)}
                </div>
                <div>
                    <b>Контакты</b>
                    <ul>
                        {Object.keys(props.user.contacts).map(contact => {
                            return <Contact socialPlace={contact} />
                        })}
                    </ul>
                </div>
                <button>Сохранить изменения</button>
                <button onClick={() => {
                    stopSubmit();
                    props.changeMode()
                }}>Отмена</button>
            </form>
    )
}

const Contact = (props) => {
    return (
        <li>
            {props.socialPlace} {createComponent(Input, `contacts.` + props.socialPlace)}
        </li>
    )
}

export default reduxForm({
    form: `ProfileForm`,
    enableReinitialize : true
})(ProfileForm);