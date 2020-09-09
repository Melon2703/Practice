import React from "react";
import cn from "classnames";
import {NavLink, Route} from "react-router-dom";
import styles from "./Prices.module.css"
import Popular from "./Popular/Popular";
import New from "./New/New";

type PropsType = {
    first  : number
    second : number
}

function Prices(props : PropsType) {

    return (
        <div>
            <div>
                <NavLink activeClassName={styles.active} className={cn(styles.link)} to="/New">{props.first}</NavLink>
                <NavLink activeClassName={styles.active} className={cn(styles.link)} to="/Popular">{props.second}</NavLink>
            </div>

            <div>
                <Route path="/New" render={() => <New/>}/>
                <Route path="/Popular" render={() => <Popular/>}/>
            </div>
        </div>
    )
}

export default Prices;