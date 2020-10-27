import {applyMiddleware, combineReducers, createStore} from 'redux';
import {ProfileReducer} from "./ProfileReducer";
import {LoginReducer} from "./LoginReducer";
import {RegisterReducer} from "./RegisterReducer";
import {RestoreReducer} from "./RestoreReducer";
import {ChangePasswordReducer} from "./ChangePasswordReducer";
import thunkMiddleWare from "redux-thunk"
import {IsFetchingReducer} from "./isFetchingReducer";
import { PacksReducer } from './PacksReducer';
import {CardsReducer} from "./CardsReducer";

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