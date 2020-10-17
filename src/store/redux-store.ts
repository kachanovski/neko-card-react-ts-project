import {combineReducers, createStore, applyMiddleware} from 'redux';
import {ProfileReducer} from "./ProfileReducer";
import {LoginReducer} from "./LoginReducer";
import {RegisterReducer} from "./RegisterReducer";
import {RestoreReducer} from "./RestoreReducer";
import {ChangePasswordReducer} from "./ChangePasswordReducer";
import thunkMiddleWare from "redux-thunk"

let reducers = combineReducers({
    profile: ProfileReducer,
    login: LoginReducer,
    register: RegisterReducer,
    restore: RestoreReducer,
    changePassword: ChangePasswordReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleWare))

export type StateType = ReturnType<typeof reducers>

//@ts-ignore
export default store