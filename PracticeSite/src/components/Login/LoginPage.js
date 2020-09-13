import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {getLogIn} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";
import {createComponent, Input} from "../ComponentsForFields/ComponentsForFields";
import {isValue, maxLength} from "../../Validators/ValidatorsForForms";
import classes from "./../ComponentsForFields/ComponenstForField.module.css"
import styles from "./LoginPage.module.scss";
import cn from "classnames";

class Login extends React.Component {

    onSubmit = (formData) => {
        this.props.getLogIn(formData)
    };

    render() {

        if (this.props.isAuth) return <Redirect to={`/profile`}/>

        return (

            <div className={cn(styles.loginBlock)}>
                <h1>Авторизация</h1>

                <ReduxForm captchaURL={this.props.captchaURL} onSubmit={this.onSubmit}/>
            </div>
        )
    }

}

let MaxLength = maxLength(15);
const LoginForm = (props) => {
    let [check, setCheck] = useState(false);

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                {createComponent(Input, `email`, `Email`, [isValue])}

                {createComponent(Input, `password`, `Password`, [isValue, MaxLength], {type: `password`})}

                {
                    props.error &&
                    <span className={classes.commonError}>
                           {props.error}
                       </span>
                }

                {check ?
                    <label onClick={() => setCheck(!check)} style={{color: "lightslategray"}} htmlFor="rememberMe">Запомнить
                        меня</label> :
                    <label onClick={() => setCheck(!check)} style={{color: "deepskyblue"}} htmlFor="rememberMe">Запомнить
                        меня</label>
                }

                {createComponent(Input, `rememberMe`, null, null, {type: `checkbox`, id: `rememberMe`})}

                {props.captchaURL &&
                <div>
                    <img className={cn(styles.captchaImg)} src={props.captchaURL} alt="captcha"/>
                    <Field component={Input} name={`captcha`} placeholder={"введите текст с картинки"}/>
                </div>}

                <div>
                    <button className={cn(styles.sendButton)}>Войти</button>
                </div>

            </form>
        </div>

    )
}

let ReduxForm = reduxForm({
    form: 'login'
})(LoginForm)


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        id: state.auth.id,
        captchaURL: state.auth.captchaURL,
    }
}

export default connect(mapStateToProps, {
    getLogIn
})(Login);