import React from "react";
import styles from "./User.module.css"
import {NavLink} from "react-router-dom";
import image from './../../../assets/images/pic_1171831236_1.png';
import cn from "classnames";

const User = (props) => {

    let id = props.id;

    let changeButton = () => {

        if (props.following) {

            props.deleteFollowUser(id);

        } else {

            props.followUser(id)

        }

    }

    return (
        <div className={cn(styles.user)}>
            <div className={cn(styles.profile_photo)}>
                <NavLink to={'/profile/' + props.id}>
                    <img src={props.photos.small != null ? props.photos.small : image}/>
                </NavLink>
            </div>
            <div className={cn(styles.profile_information)}>
                <span>{props.name}</span>
                {props.following
                    ? <button className={cn(styles.unfollow_button)}
                              disabled={props.isDisable.some(id => id === props.id)}
                              onClick={changeButton}>Отписаться</button>
                    :
                    <button className={cn(styles.follow_button)} disabled={props.isDisable.some(id => id === props.id)}
                            onClick={changeButton}>Подписаться</button>
                }
            </div>
        </div>
    )
}

export default User;
