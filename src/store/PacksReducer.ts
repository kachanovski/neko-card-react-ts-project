import {Dispatch} from "redux";
import {PacksAPI} from "../api/PacksAPI";
import {isFetching} from "./isFetchingReducer";

export type ActionsType = GetPacksType | SetSearchPacks | SetSortPacksNameUp | SetSortPacksNameDown

export type PackType = {
    _id: string
    user_id: string
    name: string
    email: string
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    update: string
}

export type PacksInitialStateType = {
    packs: Array<PackType>
    packUser_id: string
    searchName: string | null
    cardsPacksTotalCount : number
    maxCardsCount?: number | null
    minCardsCount?: number
    page?: number
    pageCount: number
}

let PacksInitialState: PacksInitialStateType = {
    packs: [],
    packUser_id: '',
    searchName: null,
    page: 1,
    pageCount: 10,
    cardsPacksTotalCount:100
}


export const PacksReducer = (state = PacksInitialState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/GET_PACKS": {
            return {
                ...state,
                packs: action.packs
            }
        }
        case "/PACKS/SEARCH_PACKS": {
            return {
                ...state
            }
        }
         case "/PACKS/SORT_PACKS_NAME_UP": {
            return {
                ...state,
                ...state.packs,
                    packs:state.packs.sort(function (a, b) {
                    let nameA = a.name.toLowerCase(),
                        nameB = b.name.toLowerCase()
                            if (nameA < nameB)
                                return -1
                            if (nameA > nameB)
                                return 1
                            return 0
                })
            }
        }
        case "/PACKS/SORT_PACKS_NAME_DOWN": {
            return {
                ...state,
                ...state.packs,
                    packs:state.packs.sort(function (a, b) {
                    let nameA = a.name.toLowerCase(),
                        nameB = b.name.toLowerCase()
                            if (nameA > nameB)
                                return -1
                            if (nameA < nameB)
                                return 1
                            return 0
                })
            }
        }
        default:
            return state
    }
}

export const getPacksAC = (packs: Array<PackType>) => {
    return {
        type: "PACKS/GET_PACKS", packs
    } as const
}

export const setSearchPacks = (searchName: string) => {
    return {
        type: '/PACKS/SEARCH_PACKS', searchName
    } as const
}
export const setSortPacksNameUp = () => {
    return {
        type: '/PACKS/SORT_PACKS_NAME_UP'
    } as const
}
export const setSortPacksNameDown = () => {
    return {
        type: '/PACKS/SORT_PACKS_NAME_DOWN'
    } as const
}

export const getPacks = (searchName: string) => {
    return (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        PacksAPI.getPacks(searchName).then(res => {
                dispatch(getPacksAC(res.data.cardPacks))
                dispatch(isFetching(false))
            }
        ).catch(e => {
                console.log(e.response.data)
                dispatch(isFetching(false))
            }
        )
    }
}

export const sortPacksUp = () => {
    return (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        PacksAPI.getPacks('').then(res => {
                dispatch(setSortPacksNameUp())
                dispatch(isFetching(false))
            }
        ).catch(e => {
                console.log(e.response.data)
                dispatch(isFetching(false))
            }
        )
    }
}
export const sortPacksDown = () => {
    return (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        PacksAPI.getPacks('').then(res => {
                dispatch(setSortPacksNameDown())
                dispatch(isFetching(false))
            }
        ).catch(e => {
                console.log(e.response.data)
                dispatch(isFetching(false))
            }
        )
    }
}


type GetPacksType = ReturnType<typeof getPacksAC>
type SetSearchPacks = ReturnType<typeof setSearchPacks>
type SetSortPacksNameUp = ReturnType<typeof setSortPacksNameUp>
type SetSortPacksNameDown = ReturnType<typeof setSortPacksNameDown>

