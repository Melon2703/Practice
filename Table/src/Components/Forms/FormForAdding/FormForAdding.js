import {Field, reduxForm} from "redux-form";
import {isValue} from "../Validations";
import React from "react";

function addingForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component="input" name="id" placeholder="id" pattern="^[0-9]+$" validate={[isValue]}/>
            <div>
                <Field component="input" name="firstName" pattern="[A-Za-zА-Яа-яЁё]{1,}" placeholder="Имя"
                       validate={[isValue]}/>
                <Field component="input" name="lastName" pattern="[A-Za-zА-Яа-яЁё]{1,}" placeholder="Фамилия"
                       validate={[isValue]}/>
            </div>
            <div>
                <Field component="input" name="email" type="email" pattern="[a-z]{1,}@[a-z]{1,}.[a-z]{1,}"
                       placeholder="email" validate={[isValue]}/>
                <Field component="input" name="phone" type="tel" pattern="\(\d{3}\)\d{3}-\d{4}"
                       placeholder="номер телефона" validate={[isValue]}/>
            </div>
            <div>
                <Field component="input" name="address.city" pattern="[A-Za-zА-Яа-яЁё\s]{1,}" placeholder="Город"
                       validate={[isValue]}/>
                <Field component="input" name="address.state" pattern="[A-Za-zА-Яа-яЁё\s]{1,}" placeholder="Область"
                       validate={[isValue]}/>
                <Field component="input" name="address.streetAddress" pattern="[A-Za-zА-Яа-яЁё\s]{1,}"
                       placeholder="Улица" validate={[isValue]}/>
                <Field component="input" name="address.zip" placeholder="Почтовый индекс" pattern="[0-9]{6}"
                       validate={[isValue]}/>
            </div>
            <Field component="textarea" name="description" placeholder="Информация о себе" validate={[isValue]}/>
            <div>
                <button disabled={!props.valid}>Добавить в таблицу</button>
            </div>
        </form>
    )
}

export let FormForAdding = reduxForm({
    form: 'adding'
})(addingForm)