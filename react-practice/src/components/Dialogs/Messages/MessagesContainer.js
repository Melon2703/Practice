import React from "react";
import {addMessage} from "../../../Redux/dialogsReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import LoginHOC from "../../Login/LoginHOC";
import {compose} from "redux";

let mapStateToProps = (state) => {

    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    }
};

export default compose(
    connect(mapStateToProps, {
        addMessage
    }),
    LoginHOC,
)(Messages);
