import React from 'react';
import './App.scss';
import {connect} from "react-redux";
import {
    addUserInTable,
    changeCurrentPage, deleteERROR,
    getLargeUsers,
    getSmallUsers, setFilterUsers,
    setUser,
    sortTable
} from "../../Redux/Reducers/UsersReducer";
import App from "./App";

function APPContainer(props) {

    if (props.error) {
        return (
            <div>
                <h2>{props.error}</h2>
                <button onClick={props.deleteERROR}>OK</button>
            </div>
        )
    }
    return <App getSmallData={props.getSmallUsers} getLargeData={props.getLargeUsers}
                addUserInTable={props.addUserInTable}
                sortTable={props.sortTable} setUser={props.setUser} changeCurrentPage={props.changeCurrentPage}
                allUsers={props.Users}
                User={props.User} Users={props.showedUsers} isLoading={props.isLoading} isFiltered={props.isFiltered}
                totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage}
                sorted={props.sorted}
                setFilterUsers={props.setFilterUsers} setDefaultUsers={props.setDefaultUsers}
                columnName={props.columnName}/>
}

let mapStateToProps = (state) => {
    return {
        totalUsersCount: state.Users.totalUsersCount,
        isLoading: state.Users.isLoading,
        showedUsers: state.Users.showedUsers,
        Users: state.Users.users,
        User: state.Users.user,
        pageSize: state.Users.pageSize,
        currentPage: state.Users.currentPage,
        isFiltered: state.Users.isFiltered,
        columnName: state.Users.columnName,
        sorted: state.Users.sorted,
        error: state.Users.error
    }
}

export default connect(mapStateToProps, {
    deleteERROR,
    setFilterUsers,
    changeCurrentPage,
    sortTable,
    setUser,
    getSmallUsers,
    getLargeUsers,
    addUserInTable
})(APPContainer);
