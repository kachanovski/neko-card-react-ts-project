import {combineReducers, createStore} from 'redux';
import {ProfileReducer} from "./ProfileReducer";
import {LoginReducer} from "./LoginReducer";
import {RegisterReducer} from "./RegisterReducer";
import {RestoreReducer} from "./RestoreReducer";
import {ChangePasswordReducer} from "./ChangePasswordReducer";

let reducers = combineReducers({
    profile: ProfileReducer,
    login: LoginReducer,
    register: RegisterReducer,
    restore: RestoreReducer,
    changePassword: ChangePasswordReducer
})
export type AppStateType = ReturnType<typeof reducers>
const store = createStore(reducers)
//@ts-ignore
export default store