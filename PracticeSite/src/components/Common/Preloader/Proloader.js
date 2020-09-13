import React from "react";
import preloader from "../../../assets/images/810.svg";
import styles from "./Preloader.module.scss"
import cn from "classnames";

const Preloader = (props) => {
    return (
        <div className={cn(styles.preloader)}>
            <img src={preloader} alt=""/>
        </div>
    )
}

export default Preloader;