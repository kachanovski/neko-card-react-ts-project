import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";

type InitialState = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: string // Data
    updated: string // Data
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    token?: string,
    tokenDeathTime?: number
    error: string,
    isFetching: boolean
}


const initialState: InitialState = {
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
    isFetching: false
}

export const LoginReducer = (state: InitialState = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case "login/SET_USER":
            return {...action.user}
        case "login/SET_ERROR":
            return {...state, error: action.error}
        case "login/SET_FETCHING":
            return {...state, isFetching: action.isFetch}
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
        console.log(promise)
    } catch (e) {
        debugger
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        console.log('Error: ', error)
        dispatch(setError(error))
    }
    dispatch(isFetching(false))
}

//AC
export const setUser = (user: InitialState) => ({type: 'login/SET_USER', user} as const)
export const setError = (error: string) => ({type: 'login/SET_ERROR', error} as const)
export const isFetching = (isFetch: boolean) => ({type: 'login/SET_FETCHING', isFetch} as const)


export type SetUserType = ReturnType<typeof setUser>
export type SetError = ReturnType<typeof setError>
export type IsFetch = ReturnType<typeof isFetching>

type ActionType = SetUserType | SetError | IsFetch