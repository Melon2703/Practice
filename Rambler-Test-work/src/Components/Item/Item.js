import React from "react";
import cn from "classnames";
import styles from "./Item.module.scss";

function Item(props) {

    let getPhotoId = () => {
        alert(props.photo.id);
    }

    return (
        <div className={cn(styles.item)}>
            <div className={cn(styles.userInfo)}>
                <img src={`//live.staticflickr.com/4430/buddyicons/${props.owner.ownerId}.jpg?`} alt=""/>
                <span>{props.owner.ownerName}</span>
            </div>
            <div className={cn(styles.photo)}>
                <img
                    src={`https://farm${props.photo.farm}.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}.jpg`}
                    alt=""/>
            </div>
            <div className={cn(styles.description)}>
                <div><span className={cn(styles.like)} onClick={getPhotoId}>♡</span></div>
                <div>{props.photo.title}</div>
            </div>
        </div>
    )
}

export default Item;