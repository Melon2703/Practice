import {applyMiddleware, combineReducers, createStore} from "redux";
import UsersReducer from "./Reducers/UsersReducer";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from 'redux-form'

const reducers = combineReducers({
    Users: UsersReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));
export default store;