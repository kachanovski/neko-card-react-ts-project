import {stringify} from "querystring";

export type ActionsType = {}

let initialState = {
    email: '',
    password: ''
}

export type initialStateType = typeof initialState

export const RegisterReducer = (state:initialStateType = initialState, action: ActionsType) => {
    return state
}

// export const OnSubmitValueAC = ()