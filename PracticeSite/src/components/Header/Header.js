import React from "react";
import styles from './Header.module.scss';
import {NavLink} from "react-router-dom";
import cn from "classnames";
import logo from "./../../assets/images/gradient_2.png"

const Header = (props) => {
    return (
        <header className={cn(styles.header)}>
            <NavLink to='/'>
                <img src={logo}></img>
            </NavLink>
            <div className={cn(styles.loginBlock)}>
                {props.isAuth === false ?
                    <NavLink to={`/login`}>
                        <span>Login</span>
                    </NavLink>
                    :
                    <div>
                        <NavLink to={`/profile/${props.id}`}>
                            <span>{props.login}</span>
                        </NavLink>

                        <button className={cn(styles.logout_button)} onClick={props.getLogOut}>Выйти</button>
                    </div>
                }
            </div>
        </header>
    );

};


export default Header;