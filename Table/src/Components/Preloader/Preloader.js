import React from "react";
import preloader from "./810.svg";
import styles from "./Preloader.module.scss"
import cn from "classnames";

function Preloader(props) {
    return (
        <div className={cn(styles.preloader)}>
            <img src={preloader} alt=""/>
        </div>
    )
}

export default Preloader;