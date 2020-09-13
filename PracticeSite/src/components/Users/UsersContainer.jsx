import React from "react";
import styles from "./Users.module.css"
import {connect} from "react-redux";
import {
    changeCurrentPage,
    deleteFollowUser,
    followUser,
    getUsersFromServer,
} from "../../Redux/usersReducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Proloader";
import {
    getCurrentPage, getIsDisable,
    getIsFetching,
    getPageSize,
    getPhotos,
    getTotalUsersCount,
    getUsers
} from "../../Redux/usersSelectors";

class UsersAPIComponent extends React.Component {

    // getUsers(currentPage, pageSize, isFetching){
    //     this.props.getUsersFromServer(currentPage, pageSize, isFetching);
    // }

    componentDidMount() {
        this.props.changeCurrentPage(1);
        this.props.getUsersFromServer(1);
    }

    render() {
        return (
            <div>
                {this.props.isFetching
                    ? <Preloader/>
                    : <Users users={this.props.users} totalUsersCount={this.props.totalUsersCount}
                             pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                             changeCurrentPage={this.props.getUsersFromServer}
                             photos={this.props.photos} isDisable={this.props.isDisable}
                             followUser={this.props.followUser} deleteFollowUser={this.props.deleteFollowUser}/>}
            </div>
        )
    }

}

let matStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        photos: getPhotos(state),
        isDisable: getIsDisable(state)
    };
};

const UsersContainer = connect(matStateToProps, {
    getUsersFromServer,
    followUser,
    deleteFollowUser,
    changeCurrentPage
})(UsersAPIComponent);

export default UsersContainer;