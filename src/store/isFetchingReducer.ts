export type InitIsFetchingReducerState = {
    isFetching: boolean
}

const initialState: InitIsFetchingReducerState = {
    isFetching: false,
}

export const IsFetchingReducer = (state: InitIsFetchingReducerState = initialState, action: ActionTypes): InitIsFetchingReducerState => {
    switch (action.type) {
        case "login/SET_FETCHING":
            return {...state, isFetching: action.isFetch}
        default:
            return state
    }
}

// AC
export const isFetching = (isFetch: boolean) => ({type: 'login/SET_FETCHING', isFetch} as const)

export type IsFetch = ReturnType<typeof isFetching>

type ActionTypes = IsFetch