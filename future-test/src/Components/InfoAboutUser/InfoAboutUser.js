import React from "react";
import style from "./InfoAboutUser.module.scss";
import cn from "classnames";

function InfoAboutUser(props) {
    return (
        <div className={cn(style.user)}>
            <div><span>Выбран пользователь: <b>{`${props.User.firstName} ${props.User.lastName}`}</b></span></div>
            <div><span>Описание:</span></div>
            <p>{props.User.description}</p>
            <ul>
                <li>Города: <b>{props.User.address.city}</b></li>
                <li>Область/Штат: <b>{props.User.address.state}</b></li>
                <li>Улица: <b>{props.User.address.streetAddress}</b></li>
                <li>Индекс: <b>{props.User.address.zip}</b></li>

            </ul>
        </div>
    )
}

//Быстрое отображение для англ названий
// {Object.keys(props.User.address).map((place, id) => <li
//     key={id}>{place} : <b>{Object.values(props.User.address)[id]}</b></li>)}

export default InfoAboutUser;