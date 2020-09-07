import React from "react";
import classes from "./ComponenstForField.module.css"
import {Field} from "redux-form";
import {isValue} from "../../Validators/ValidatorsForForms";

// export const ComponentForField = (props) => {
//     let {input, meta, children, ...restprops} = props;
//
//     let validator = meta.touched && meta.error;
//
//     let comp = children;
//     return (
//         <div>
//             <div className={classes.formControl + ' ' + (validator ? classes.error : '')}>
//                 <comp {...input} {...restprops} />
//             </div>
//
//             { validator && <span>{meta.error}</span> }
//         </div>
//
//     )
// }

export const createComponent = (component, name, placeholder = null, validators = null, props = {}) => {
   return <div>
        <Field component={component} name={name} placeholder={placeholder} validate={validators} {...props}/>
    </div>
}


export const Textarea = (props) => {
    let {input, meta, children, ...restprops} = props;

    let validator = meta.touched && meta.error;

    return (
        <div className={classes.formControl + ' ' + (validator ? classes.error : '')}>
            <div>
                <textarea {...input} {...restprops}/>
            </div>

            { validator && <span>{meta.error}</span> }
        </div>

    )
}

export const Input = (props) => {
    let {input, meta, children, ...restprops} = props;

    let validator = meta.touched && meta.error;

    return (
        <div className={classes.formControl + ' ' + (validator ? classes.error : '')}>
            <div>
                <input {...input} {...restprops}/>
            </div>

            { validator && <span>{meta.error}</span> }
        </div>

    )
}
