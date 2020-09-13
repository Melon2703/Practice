import {Field, reduxForm} from "redux-form";
import React from "react";
import styles from "./FormForFilter.module.scss";
import cn from "classnames";

let filterForm = (props) => {
    return (
        <form className={cn(styles.form)} onSubmit={props.handleSubmit}>
            <Field component="input" name="filterOps"/>
            <button>Найти</button>
        </form>
    )
}

export let FormForFilter = reduxForm({
    form: 'filter'
})(filterForm)