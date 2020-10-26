import {Dispatch} from "redux";
import {PacksAPI} from "../api/PacksAPI";
import {isFetching} from "./isFetchingReducer";

export type ActionsType = GetPacksType | SetSearchPacks

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
    cardsPacksTotalCount:1000
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
                ...state,
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


type GetPacksType = ReturnType<typeof getPacksAC>
type SetSearchPacks = ReturnType<typeof setSearchPacks>

