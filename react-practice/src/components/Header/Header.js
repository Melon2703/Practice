import React from "react";
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";
import cn from "classnames";

const Header = (props) => {
    return (
        <header className={styles.header}>
            <NavLink to='/'>
                <img src="https://static.rfstat.com/renderforest/images/v2/logo-homepage/gradient_2.png"></img>
            </NavLink>
                <div className={styles.loginBlock}>
                        { props.isAuth === false ? `Login` :
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