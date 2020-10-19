import {Dispatch} from "redux";
import {RegisterAPI, PostType} from "../api/registerAPI";

export type ActionsType =
    SetRegisterDataAcType
    | SetErrorMessageAcType
    | SetRegisterFetchingAcType

export type RegisterUserDataType={
    email:string
    id:string
}

let initialState = {
   data: {
       email: '',
       id: '',
   },
    errorMessage: '',
    registerFetching: false,
}

export type initialStateType = typeof initialState

export const RegisterReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "REGISTER/SET-REGISTER-DATA": {
            return {
                ...state,
              ...state.data, data: action.data
            }
        }
        case "REGISTER/SET-ERROR-MESSAGE-TYPE": {
            return {
                ...state,
                errorMessage: action.message
            }
        }
        case "REGISTER/TOGGLE-REGISTER-FETCHING":{
            return {
                ...state,
                registerFetching: action.registerFetching
            }
        }
        default:
            return state
    }
}

export const SetRegisterDataAC = (data:RegisterUserDataType) => {
    return {type: "REGISTER/SET-REGISTER-DATA", data} as const
}
export const SetErrorMessageAC = (message: string) => {
    return {type: "REGISTER/SET-ERROR-MESSAGE-TYPE", message} as const
}
export const SetRegisterFetchingAC = (registerFetching: boolean) => {
    return {type: "REGISTER/TOGGLE-REGISTER-FETCHING", registerFetching} as const
}

export const RegisterUserTC = (data: PostType) => {
    return (dispatch: Dispatch) => {
        dispatch(SetRegisterFetchingAC(true))
        debugger
        RegisterAPI.RegisterUser(data)
            .then(res => {
                debugger
                if (!res.data.error) {
                    dispatch(SetRegisterDataAC(res.data.addedUser))
                }else {
                    dispatch(SetErrorMessageAC(res.data.error))
                }
                dispatch(SetRegisterFetchingAC(false))
            })
            .catch(e => {
                debugger
                console.log(e.response.data.error)
                dispatch(SetErrorMessageAC(e.response.data.error))
                dispatch(SetRegisterFetchingAC(false))
                }
            )

    }
}

type SetRegisterDataAcType = ReturnType<typeof SetRegisterDataAC>
type SetErrorMessageAcType = ReturnType<typeof SetErrorMessageAC>
type SetRegisterFetchingAcType = ReturnType<typeof SetRegisterFetchingAC>

