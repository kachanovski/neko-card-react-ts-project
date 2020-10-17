import {RestoreFormInput} from "../main/authGroup/RestorePage/Restore"
import {Dispatch} from "redux";
import axios from 'axios'
import {ChangePasswordFormInput} from "../main/authGroup/RestorePage/RestoreChangePassword";

export type ActionsType = SetLoadingType | SetDisableButtonType | SetSuccessRequest

export type InitialRestoreStateType = {
    responseLoading: boolean
    error: string | null
    success: boolean
}

let initialState: InitialRestoreStateType = {
    responseLoading: false,
    error: null,
    success: false
}

export const RestoreReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'RESTORE/SET_RESPONSE_LOADING' :
            return { ...state, isLoading: action.value}
        case 'RESTORE/SET_ERROR':
            return {...state, error: action.error}
            case 'RESTORE/SET_SUCCESS_REQUEST':
            return {...state, error: action.success}
        default:
            return state
    }
}

export const setError = (error: string | null) => ({
    type: 'RESTORE/SET_ERROR', error
} as const)
export const setResponseLoading = (value: boolean) => ({
    type: 'RESTORE/SET_RESPONSE_LOADING', value
} as const)
export const setSuccessRequest = (success: boolean) => ({
    type: 'RESTORE/SET_SUCCESS_REQUEST', success
} as const)

//types
export type SetLoadingType = ReturnType<typeof setError>
export type SetDisableButtonType = ReturnType<typeof setResponseLoading>
export type SetSuccessRequest = ReturnType<typeof setSuccessRequest>


//thunk
export const RestoreTC = (data: RestoreFormInput) => (dispatch: Dispatch) => {
    dispatch(setResponseLoading(true))
    dispatch(setSuccessRequest(false))
    RestoreApi.restore(data)
        .then(res => {
            if( res.status === 200) {
                dispatch(setResponseLoading(false))
                dispatch(setError(null))
                dispatch(setSuccessRequest(true))
            }
            }
        )
        .catch(e => {
            dispatch(setResponseLoading(false))
            dispatch(setError(e.response.data.error))
        })
    dispatch(setResponseLoading(false))
}

export const ChangePasswordTC = (password: ChangePasswordFormInput) => (dispatch: Dispatch) => {
    dispatch(setResponseLoading(true))
    dispatch(setSuccessRequest(false))
    RestoreApi.changePassword(password)
        .then( res => {
            if(res.status === 200) {
                dispatch(setResponseLoading(false))
                dispatch(setSuccessRequest(true))
            }
        })
        .catch(e => {
            dispatch(setResponseLoading(false))
            dispatch(setError(e.response.data.error))
        })
}



//api

const instance = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:7542/2.0/"
})

export const RestoreApi = {
    restore(data: RestoreFormInput) {
        const email = data.email
        return instance.post('auth/forgot', {
            email,
            message: `<div style="background-color: lime; padding: 15px">
                          password recovery link: 
                          <a href='http://localhost:3000/neko-card-react-ts-project#/changePassword/$token$'>link</a>
                      </div> `
        })
    },
    changePassword(data: ChangePasswordFormInput) {
        const passwordToken = window.location.href.split('/')[5]
        const password = data.password
        return instance.post('auth/set-new-password' , {password, passwordToken})
    }
}
