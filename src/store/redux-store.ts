import {applyMiddleware, combineReducers, createStore} from 'redux';
import {ProfileReducer} from "./ProfileReducer";
import {LoginReducer} from "./LoginReducer";
import {RegisterReducer} from "./RegisterReducer";
import {RestoreReducer} from "./RestoreReducer";
import {ChangePasswordReducer} from "./ChangePasswordReducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
    profile: ProfileReducer,
    login: LoginReducer,
    register: RegisterReducer,
    restore: RestoreReducer,
    changePassword: ChangePasswordReducer
})

export type AppStateType = ReturnType<typeof reducers>

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.store =store

export default store