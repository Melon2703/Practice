import React from "react";
import styles from './Friends.module.css';
import {connect} from "react-redux";
import Friend from "./Friend/Friend";
import {Redirect} from "react-router-dom";
import {getUsersFromServer} from "../../Redux/usersReducer";
import cn from "classnames";


class Friends extends React.Component {

    componentDidMount() {
        this.props.getUsersFromServer(this.props.currentPage);
    }

    render() {
        let friends = this.props.users.filter(user => user.followed).map(user => {
            return <Friend key={user.id} photo={user.photos.small} name={user.name}/>
        })

        if(this.props.isAuth){
            return (
                <div className={cn(styles.friends)}>
                    <h2>Ваши друзья</h2>
                    <div>
                        {friends}
                    </div>
                </div>
            )
        }
        return <Redirect to='/login'/>
    }
}

let mapStateToProps = (state) =>{
    return {
        users : state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {
    getUsersFromServer
})(Friends);