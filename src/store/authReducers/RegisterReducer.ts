import {Dispatch} from "redux";
import {RegisterAPI, PostType} from "../../api/AuthAPI/registerAPI";
import {IsFetch, isFetching} from "../isFetchingReducer";

export type ActionsType =
    SetRegisterDataAcType
    | SetErrorMessageAcType
    | IsFetch

export type RegisterUserDataType = {
    email: string
    id: string
}

let initialState = {
    data: {
        email: '',
        id: '',
    },
    errorMessage: '',
}

export type initialStateType = typeof initialState

export const RegisterReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "REGISTER/SET-REGISTER-DATA": {
            return {...state, ...state.data, data: action.data}
        }
        case "REGISTER/SET-ERROR-MESSAGE-TYPE": {
            return { ...state, errorMessage: action.message}
        }
        default:
            return state
    }
}

export const SetRegisterDataAC = (data: RegisterUserDataType) => {
    return {type: "REGISTER/SET-REGISTER-DATA", data} as const
}
export const SetErrorRegisterAC = (message: string) => {
    return {type: "REGISTER/SET-ERROR-MESSAGE-TYPE", message} as const
}

export const RegisterUserTC = (data: PostType) => {
    return (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        RegisterAPI.RegisterUser(data)
            .then(res => {
                if (!res.data.error) {
                    dispatch(SetRegisterDataAC(res.data.addedUser))
                } else {
                    dispatch(SetErrorRegisterAC(res.data.error))
                }
                dispatch(isFetching(false))
            })
            .catch(e => {
                    dispatch(SetErrorRegisterAC(e.response.data.error))
                    dispatch(isFetching(false))
                }
            )

    }
}

type SetRegisterDataAcType = ReturnType<typeof SetRegisterDataAC>
type SetErrorMessageAcType = ReturnType<typeof SetErrorRegisterAC>

