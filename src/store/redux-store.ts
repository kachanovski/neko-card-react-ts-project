import {applyMiddleware, combineReducers, createStore} from 'redux';
import {ProfileReducer} from "./profileReducers/ProfileReducer";
import {LoginReducer} from "./authReducers/LoginReducer";
import {RegisterReducer} from "./authReducers/RegisterReducer";
import {RestoreReducer} from "./authReducers/RestoreReducer";
import {ChangePasswordReducer} from "./authReducers/ChangePasswordReducer";
import thunkMiddleWare from "redux-thunk"
import {IsFetchingReducer} from "./isFetchingReducer";
import { PacksReducer } from './profileReducers/PacksReducer';
import {CardsReducer} from "./profileReducers/CardsReducer";

let reducers = combineReducers({
    profile: ProfileReducer,
    login: LoginReducer,
    register: RegisterReducer,
    restore: RestoreReducer,
    changePassword: ChangePasswordReducer,
    isFetching: IsFetchingReducer,
    packs: PacksReducer,
    cards: CardsReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleWare))

export type StateType = ReturnType<typeof reducers>

export default store

// @ts-ignore
window.store = store