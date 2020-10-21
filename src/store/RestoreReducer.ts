import {RestoreFormInput} from "../main/authGroup/RestorePage/Restore"
import {Dispatch} from "redux";
import {ChangePasswordFormInput} from "../main/authGroup/RestorePage/RestoreChangePassword";
import {RestoreApi} from "../api/restoreAPI";
import {IsFetch, isFetching} from "./isFetchingReducer";

export type ActionsType = SetLoadingType | IsFetch | SetSuccessRequest

export type InitialRestoreStateType = {
    error: string | null
    success: boolean
    disableButton: boolean
}

let initialState: InitialRestoreStateType = {
    error: null,
    success: false,
    disableButton: false
}

export const RestoreReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'RESTORE/SET_ERROR':
            return {...state, error: action.error}
        case 'RESTORE/SET_SUCCESS_REQUEST':
            return {...state, success: action.success}
        default:
            return state
    }
}

export const setError = (error: string | null) => ({
    type: 'RESTORE/SET_ERROR', error
} as const)
export const setSuccessRequest = (success: boolean) => ({
    type: 'RESTORE/SET_SUCCESS_REQUEST', success
} as const)

//types
export type SetLoadingType = ReturnType<typeof setError>
export type SetSuccessRequest = ReturnType<typeof setSuccessRequest>



//thunk
export const RestoreTC = (data: RestoreFormInput) => (dispatch: Dispatch) => {
    dispatch(isFetching(true))
    dispatch(setSuccessRequest(false))

    RestoreApi.restore(data)
        .then(res => {
                if (res.status === 200) {
                    dispatch(isFetching(true))
                    dispatch(setError(null))
                    dispatch(setSuccessRequest(true))
                }
            }
        )
        .catch(e => {
            dispatch(isFetching(false))
            dispatch(setError(e.response.data.error))
        })

}

export const ChangePasswordTC = (password: ChangePasswordFormInput) => (dispatch: Dispatch) => {
    dispatch(isFetching(true))
    dispatch(setSuccessRequest(false))
    RestoreApi.changePassword(password)
        .then(res => {
            if (res.status === 200) {
                dispatch(isFetching(true))
                setError(null)
                dispatch(setSuccessRequest(true))
            }
        })
        .catch(e => {
            dispatch(isFetching(false))
            dispatch(setError(e.response.data.error))
        })
}
