import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const LoginHOC = (Component) => {

    class RedirectComponent extends React.Component {
        render() {

            if (!this.props.isAuth && !this.props.match.params.userId) return <Redirect to='/login'/>

            return <Component {...this.props}/>

        }

    }

    let mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
    })

    return connect(mapStateToProps)(RedirectComponent)
}

export default LoginHOC;