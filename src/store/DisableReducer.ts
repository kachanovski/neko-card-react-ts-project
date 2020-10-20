export type InitDisableReducerState = {
    disable: boolean
}

const initialState: InitDisableReducerState = {
    disable: false
}

export const DisableReducer = (state: InitDisableReducerState = initialState, action: ActionTypes): InitDisableReducerState => {
    switch (action.type) {
        case "disable/SET_DISABLE":
            return {...state, disable: action.disable}
        default:
            return state
    }
}

//AC
export const setDisable = (disable: boolean) => ({type: 'disable/SET_DISABLE', disable} as const)

type SetDisableType = ReturnType<typeof setDisable>

type ActionTypes = SetDisableType