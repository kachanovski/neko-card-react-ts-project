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
    error: string
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
    updated: ''
}

export const LoginReducer = (state: InitialState = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case "login/SET_USER":
            return {...action.user}
        case "login/SET_ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}


//thunk
export const setLogin = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
    try {
        const promise = await authAPI.login(email, password, rememberMe)
        dispatch(setUser(promise.data))
        console.log(promise)
    } catch (e) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        console.log('Error: ', error)
        dispatch(setError(error))
    }
}

// export const registerUser = (email: string, password: string) => async (dispatch: Dispatch) => {
//     try {
//         const promise = await authAPI.register(email, password)
//         console.log(promise.data)
//     }catch (e) {
//         const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
//         console.log('Error: ', error)
//     }
// }
//AC
export const setUser = (user: InitialState) => ({type: 'login/SET_USER', user} as const)
export const setError = (error: string) => ({type: 'login/SET_ERROR', error} as const)

export type SetUserType = ReturnType<typeof setUser>
export type SetError = ReturnType<typeof setError>

type ActionType = SetUserType
    | SetError