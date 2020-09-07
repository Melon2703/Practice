import React from "react";
import {withRouter,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";

const LoginHOC = (Component) => {

    class RedirectComponent extends React.Component{
        render(){
            let userId = this.props.match.params.userId;

                if(!this.props.isAuth && !userId) return <Redirect to='/login' />

                    return <Component {...this.props}/>

        }

    }

    let mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
        id : state.auth.id
    })

    return compose(withRouter,
        connect(mapStateToProps))(RedirectComponent)

    ;
}

export default LoginHOC;