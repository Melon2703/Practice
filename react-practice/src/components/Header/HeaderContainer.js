import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getLogOut, logIn} from "../../Redux/authReducer";

class HeaderContainer extends React.Component{

    componentDidMount() {
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
        isFetching: state.auth.isFetching,
    };
}

export default connect(mapStateToProps, {
    getLogOut
})(HeaderContainer);