import {Dispatch} from "redux";
import {RegisterAPI} from "../api/api";

export type ActionsType = SetRegisterDataAcType

let initialState = {
    email: '',
    password: ''
}

export type initialStateType = typeof initialState

export const RegisterReducer = (state:initialStateType = initialState, action: ActionsType):initialStateType => {
    switch (action.type) {
        case "SET-REGISTER-DATA":{
            return {
                ...state, ...action.data
            }
        }
        default: return state
    }
}

export const SetRegisterDataAC = (data:initialStateType)=>{
    return{type:"SET-REGISTER-DATA", data} as const
}

export const RegisterUserTC = (data:initialStateType)=>{
    return (dispatch:Dispatch)=>{
        debugger
        RegisterAPI.RegisterUser(data).then(res=>{
            debugger
            if (!res.error) {
                dispatch(SetRegisterDataAC(res.addedUser))
            }
        })
    }
}

type SetRegisterDataAcType = ReturnType<typeof SetRegisterDataAC>

