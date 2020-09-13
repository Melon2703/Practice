import React from "react";
import classes from './Sidebar.module.css';
import {NavLink} from "react-router-dom";
import Prev_Friends from "../Friends/Prev_Friends/Prev_Friends";

const Sidebar = (props) => {
    return (
        <nav className={classes.sidebar}>
            <div>
                <NavLink to='/profile' /*activeClassName={classes.active}*/ className={classes.item}>Профиль</NavLink>
            </div>
            <div>
                <NavLink to='/users' /*activeClassName={classes.active}*/
                         className={classes.item}>Пользователи</NavLink>
            </div>
            <div>
                <NavLink to='/messages' /*activeClassName={classes.active}*/
                         className={classes.item}>Сообщения</NavLink>
            </div>
            <div>
                <NavLink to='/friends' /*activeClassName={classes.active}*/ className={classes.item}>Друзья</NavLink>
                {/*<Prev_Friends state={props.friends}/>*/}
            </div>
            <div>
                <NavLink to='/news' /*activeClassName={classes.active}*/ className={classes.item}>Новости</NavLink>
            </div>
            <div>
                <NavLink to='/music' /*activeClassName={classes.active}*/ className={classes.item}>Музыка</NavLink>
            </div>
            <div>
                <NavLink to='/settings' /*activeClassName={classes.active}*/
                         className={classes.item}>Настройки</NavLink>
            </div>
        </nav>
    );
};

export default Sidebar;