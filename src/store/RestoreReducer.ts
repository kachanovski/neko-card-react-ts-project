import {RestoreFormInput} from "../main/authGroup/RestorePage/Restore"
import {Dispatch} from "redux";
import axios from 'axios'
import {ChangePasswordFormInput} from "../main/authGroup/RestorePage/RestoreChangePassword";

export type ActionsType = SetLoadingType | SetLoading | SetSuccessRequest | SetButtonDisable

export type InitialRestoreStateType = {
    error: string | null
    loading: boolean
    success: boolean
    disableButton: boolean
}

let initialState: InitialRestoreStateType = {
    loading: false,
    error: null,
    success: false,
    disableButton: false
}

export const RestoreReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'RESTORE/SET_LOADING' :
            return {...state, loading: action.loading}
        case 'RESTORE/SET_ERROR':
            return {...state, error: action.error}
        case 'RESTORE/SET_SUCCESS_REQUEST':
            return {...state, success: action.success}
        case "RESTORE/SET_BUTTON_DISABLE" :
            return {...state, disableButton: action.disable}
        default:
            return state
    }
}

export const setError = (error: string | null) => ({
    type: 'RESTORE/SET_ERROR', error
} as const)
export const setLoading = (loading: boolean) => ({
    type: 'RESTORE/SET_LOADING', loading
} as const)
export const setButtonDisable = (disable: boolean) => ({
    type: 'RESTORE/SET_BUTTON_DISABLE', disable
} as const)
export const setSuccessRequest = (success: boolean) => ({
    type: 'RESTORE/SET_SUCCESS_REQUEST', success
} as const)

//types
export type SetLoadingType = ReturnType<typeof setError>
export type SetLoading = ReturnType<typeof setLoading>
export type SetSuccessRequest = ReturnType<typeof setSuccessRequest>
export type SetButtonDisable = ReturnType<typeof setButtonDisable>


//thunk
export const RestoreTC = (data: RestoreFormInput) => (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    dispatch(setSuccessRequest(false))
    dispatch(setButtonDisable(true))

    RestoreApi.restore(data)
        .then(res => {
                if (res.status === 200) {
                    dispatch(setLoading(false))
                    dispatch(setError(null))
                    dispatch(setSuccessRequest(true))
                    dispatch(setButtonDisable(false))
                }
            }
        )
        .catch(e => {
            dispatch(setLoading(false))
            dispatch(setButtonDisable(false))
            dispatch(setError(e.response.data.error))
        })

}

export const ChangePasswordTC = (password: ChangePasswordFormInput) => (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    dispatch(setSuccessRequest(false))
    dispatch(setButtonDisable(true))
    RestoreApi.changePassword(password)
        .then(res => {
            if (res.status === 200) {
                dispatch(setLoading(false))
                setError(null)
                dispatch(setButtonDisable(false))
                dispatch(setSuccessRequest(true))
            }
        })
        .catch(e => {
            dispatch(setLoading(false))
            dispatch(setButtonDisable(false))
            dispatch(setError(e.response.data.error))
        })
}


//api

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7542/2.0/"
    // baseURL: "https://neko-back.herokuapp.com/2.0"
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
        const password = data.repeat_password
        return instance.post('auth/set-new-password', {password: password, resetPasswordToken: passwordToken})
    }
}
