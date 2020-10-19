import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";

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
    isFetching: boolean,
    errorIn?: ErrorInType
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
    isFetching: false,
}

export const LoginReducer = (state: InitialLoginReducerState = initialState, action: ActionType): InitialLoginReducerState => {
    switch (action.type) {
        case "login/SET_USER":
            return {...state, ...action.user}
        case "login/SET_ERROR":
            return {...state, error: action.error}
        case "login/SET_FETCHING":
            return {...state, isFetching: action.isFetch}
        case "login/SET_ERROR_IN_PASS":
            return {...state, errorIn: action.errorIn}
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
                dispatch(setErrorInPass("password"))  // диспатч "password", чтобы отобразить ошибку в логине
            } else if (e.response.data.email) {             // если валидацию не прошел логин (email)
                dispatch(setErrorInPass("email"))   // диспатч "email", чтобы отобразить ошибку в пароле
            }
            dispatch(setError(e.response.data.error))
        } else {
            console.log('ERROR: ', e.message + ', more details in the console')
        }
    }
    dispatch(isFetching(false))
}

type ErrorInType = 'password' | 'email'
//AC
export const setUser = (user: InitialLoginReducerState) => ({type: 'login/SET_USER', user} as const)
export const setError = (error: string) => ({type: 'login/SET_ERROR', error} as const)
export const isFetching = (isFetch: boolean) => ({type: 'login/SET_FETCHING', isFetch} as const)
export const setErrorInPass = (errorIn: ErrorInType) => ({type: 'login/SET_ERROR_IN_PASS', errorIn} as const)

export type SetUserType = ReturnType<typeof setUser>
export type SetError = ReturnType<typeof setError>
export type IsFetch = ReturnType<typeof isFetching>
export type ErrorPass = ReturnType<typeof setErrorInPass>

type ActionType = SetUserType | SetError | IsFetch | ErrorPass