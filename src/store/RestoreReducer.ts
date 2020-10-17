import {RestoreFormInput} from "../main/authGroup/RestorePage/Restore"
import {Dispatch} from "redux";
import axios from 'axios'
import {ChangePasswordFormInput} from "../main/authGroup/RestorePage/RestoreChangePassword";

export type ActionsType = SetLoadingType | SetDisableButtonType

export type InitialRestoreStateType = {
    responseLoading: boolean
    error: string | null
}

let initialState: InitialRestoreStateType = {
    responseLoading: false,
    error: null
}

export const RestoreReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'RESTORE/SET_RESPONSE_LOADING' :
            return { ...state, isLoading: action.value}
        case 'RESTORE/SET_ERROR':
            return {...state, error: action.error}
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

//types
export type SetLoadingType = ReturnType<typeof setError>
export type SetDisableButtonType = ReturnType<typeof setResponseLoading>


//thunk
export const RestoreTC = (data: RestoreFormInput) => (dispatch: Dispatch) => {
    dispatch(setResponseLoading(true))
    RestoreApi.restore(data)
        .then(res => {
            if( res.status === 200) {
                dispatch(setResponseLoading(false))
                dispatch(setError('Перейдите по ссылке на Email'))
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
    RestoreApi.changePassword(password)
        .then( res => {
            if(res.status === 200) {
                dispatch(setResponseLoading(false))
            }
            console.log(res)
        })
        .catch(e => {
            dispatch(setResponseLoading(false))
            dispatch(setError(e.response.data.error))
        })
}



//api
export const RestoreApi = {
    restore(data: RestoreFormInput) {
        const email = data.email
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {
            email,
            message: `<div style="background-color: lime; padding: 15px">
                          password recovery link: 
                          <a href='http://localhost:3000/neko-card-react-ts-project#/changePassword/$token$'>link</a>
                      </div> `
        })
    },
    changePassword(data: ChangePasswordFormInput) {
        const resetPasswordToken = window.location.href.split('/')[5]
        const password = data.password
        return axios.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password' , {password, resetPasswordToken})
    }
}
