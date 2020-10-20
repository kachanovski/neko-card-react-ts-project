export type InitLoadingReducerType = {
    isLoading: boolean
}

const InitialState: InitLoadingReducerType = {
    isLoading: false
}

export const LoadingReducer = (state: InitLoadingReducerType = InitialState, action: ActionTypes): InitLoadingReducerType => {
    switch (action.type) {
        case "loading/SET_LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}

//AC
export const setLoading = (isLoading: boolean) => ({type: 'loading/SET_LOADING', isLoading} as const)

type SetLoadingType = ReturnType<typeof setLoading>

type ActionTypes = SetLoadingType