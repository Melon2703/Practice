import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUser, setMyData, setPhoto, setStatusTC} from "../../Redux/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import LoginHOC from "../Login/LoginHOC";
import {compose} from "redux";

class ProfileContainer extends React.Component{

    loadUser(){
        let userId = this.props.match.params.userId;
        if(!userId) userId = this.props.id;
        this.props.getUser(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.loadUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if( prevProps.id !== this.props.match.params.userId)
        this.loadUser();
    }

    render(){
        if(this.props.isAuth && this.props.match.params.userId && (+this.props.match.params.userId === this.props.id)){
            return <Redirect to={`/profile`}/>
        }

        return (
            <Profile isAuth={this.props.isAuth} setPhoto={this.props.setPhoto} isOwner={!this.props.match.params.userId}
                     user={this.props.user} id={this.props.id} userId={this.props.match.params.userId}
                      status={this.props.status} setStatus={this.props.setStatus} setMyData={this.props.setMyData}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
    user: state.profilePage.user,
    status : state.profilePage.status,
    id: state.auth.id,
        isAuth: state.isAuth
}
};


export default compose(
    connect(mapStateToProps, {
        getUser,
        getStatus,
        setStatus : setStatusTC,
        setPhoto,
        setMyData
    }),
    withRouter,
    LoginHOC,
)(ProfileContainer);
