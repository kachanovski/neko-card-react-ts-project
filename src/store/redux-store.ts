import {combineReducers, createStore, applyMiddleware} from 'redux';
import {ProfileReducer} from "./ProfileReducer";
import {LoginReducer} from "./LoginReducer";
import {RegisterReducer} from "./RegisterReducer";
import {RestoreReducer} from "./RestoreReducer";
import {ChangePasswordReducer} from "./ChangePasswordReducer";
import thunkMiddleWare from "redux-thunk"
import {LoadingReducer} from "./LoadingReducer";
import {DisableReducer} from "./DisableReducer";

let reducers = combineReducers({
    profile: ProfileReducer,
    login: LoginReducer,
    register: RegisterReducer,
    restore: RestoreReducer,
    changePassword: ChangePasswordReducer,
    loading: LoadingReducer,
    disable: DisableReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleWare))

export type StateType = ReturnType<typeof reducers>

export default store

// @ts-ignore
window.store = store