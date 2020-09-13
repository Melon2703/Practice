import React from "react";
import User from "./UserItem/User";
import styles from "./Users.module.css";
import Paginator from "./Paginator";
import cn from "classnames";

const Users = (props) => {
    let users = props.users.map(item => {
        return (
            <User key={item.id} id={item.id}
                  name={item.name}
                  following={item.followed}
                  status={item.status}
                  location={item.location}
                  photos={item.photos}
                  isDisable={props.isDisable}
                  followUser={props.followUser}
                  deleteFollowUser={props.deleteFollowUser}/>
        )
    });

    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       changeCurrentPage={props.changeCurrentPage}
                       currentPage={props.currentPage}
                       portionSize={5}/>
            <div className={cn(styles.users)}>
                {users}
            </div>
        </div>
    )
}

export default Users;