    import React from "react";
import preloader from "../../../assets/images/810.svg";
import classes from "./Preloader.module.css"

const Preloader = (props) => {
    return (
        <div className={classes.preloader}>
            <img src={preloader} alt=""/>
        </div>
    )
}

export default Preloader;