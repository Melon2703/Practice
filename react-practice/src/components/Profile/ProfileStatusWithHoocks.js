import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";

const ProfileStatusWithHoocks = (props) =>{

    let [isMode, setIsMode] = useState(false);

   const changeMode = () => {
       setIsMode(!isMode);
    }

    const onSubmit = (formData) => {
        setIsMode(!isMode);
        props.setStatus(formData.StatusForm);
    }


        return (
            <div>
                <b>Статус: </b>
                { !isMode ?
                    props.isAuth && props.isOwner ?
                           <span onDoubleClick={changeMode}>{props.status}</span> :
                           <span>{props.status}</span>
                 :
                        <ReduxStatus onSubmit={onSubmit} initialValues={{StatusForm: props.status}}/>
                }
            </div>
        )

}

const StatusForm = (props) => {
    return (
        <form onBlur={props.handleSubmit}>
            <Field component='input' name='StatusForm' autoFocus={true} />
        </form>
    )
}

let ReduxStatus = compose(
    connect(()=>{
        return {}
    }, {})
    ,reduxForm({
    form: `status`
}))(StatusForm)

export default ProfileStatusWithHoocks;