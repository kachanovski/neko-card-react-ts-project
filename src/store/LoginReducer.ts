import {Dispatch} from "redux";
import {authAPI, ResponseServerType} from "../api/authAPI";
import {IsFetch, isFetching} from "./isFetchingReducer";

export type InitialLoginReducerState = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: string // Date
    updated: string // Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    token?: string,
    tokenDeathTime?: number
    error: string,
    errorIn?: ErrorInType
    authMe: boolean
}


const initialState: InitialLoginReducerState = {
    _id: '',
    email: '',
    name: '',
    rememberMe: false,
    error: '',
    verified: false,
    publicCardPacksCount: 0,
    isAdmin: false,
    created: '',
    updated: '',
    authMe: false
}

export const LoginReducer = (state: InitialLoginReducerState = initialState, action: ActionType): InitialLoginReducerState => {
    switch (action.type) {
        case "login/SET_USER":
            return {...state, ...action.user, authMe: true}
        case "login/SET_ERROR":
            return {...state, error: action.error}
        case "login/SET_ERROR_IN":
            return {...state, errorIn: action.errorIn}
        case "login/SET_LOGOUT_USER":
            return {...state, authMe: false}
        case "login/AUTH_ME":
            return {...state, authMe: true}
        default:
            return state
    }
}


//thunk
export const setLogin = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
    try {
        dispatch(isFetching(true))
        const promise = await authAPI.login(email, password, rememberMe)
        dispatch(setUser(promise.data))
        console.log("Response(login): ", promise)
    } catch (e) {
        if (e.response) {
            console.log('ERROR(login): ', e.response.data.error)
            if (e.response.data.password) {                   // если валидацию не прошел пароль
                dispatch(setErrorInPass("password"))  // диспатч "password", чтобы отобразить ошибку в пароле
            } else if (e.response.data.email) {             // если валидацию не прошел логин (email)
                dispatch(setErrorInPass("email"))   // диспатч "email", чтобы отобразить ошибку в логине
            }
            dispatch(setError(e.response.data.error))
        } else {
            console.log('ERROR: ', e.message + ', more details in the console')
        }
    }
    dispatch(isFetching(false))
}

export const setLogOutUser = () => async (dispatch: Dispatch) => {
    try {
        const promise = await authAPI.logout()
        dispatch(logOutAction())
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log('Log out error: ', error)
    }
}
export const AuthMe = () => async (dispatch: Dispatch) => {
    try {
        const promise = await authAPI.authMe()
        dispatch(authMe())
        dispatch(setUser(promise.data))
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log('Log out error: ', error)
    }
}

export type ErrorInType = 'password' | 'email'
//AC
export const setUser = (user: ResponseServerType) => ({type: 'login/SET_USER', user} as const)
export const setError = (error: string) => ({type: 'login/SET_ERROR', error} as const)
export const setErrorInPass = (errorIn: ErrorInType) => ({type: 'login/SET_ERROR_IN', errorIn} as const)
export const logOutAction = () => ({type: 'login/SET_LOGOUT_USER'} as const)
export const authMe = () => ({type: 'login/AUTH_ME'} as const)

export type SetUserType = ReturnType<typeof setUser>
export type SetError = ReturnType<typeof setError>
export type ErrorPass = ReturnType<typeof setErrorInPass>
export type logOutUserType = ReturnType<typeof logOutAction>
export type authMeAction = ReturnType<typeof authMe>

type ActionType = SetUserType | SetError | IsFetch | ErrorPass | logOutUserType | authMeAction