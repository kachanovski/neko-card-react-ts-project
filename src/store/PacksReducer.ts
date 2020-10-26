import {Dispatch} from "redux";
import {PacksAPI} from "../api/PacksAPI";

export type ActionsType = GetPacksType | SetSearchPacks

export type PackType = {
    _id: string
    name: string
    email: string
}

export type PacksInitialStateType = {
    packs: Array<PackType>
    packUser_id: string
    searchName: string | null
}

let PacksInitialState: PacksInitialStateType = {
    packs: [],
    packUser_id: '',
    searchName: null
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
        PacksAPI.getPacks(searchName).then(res => {
                dispatch(getPacksAC(res.data.cardPacks))
            }
        ).catch(e =>
            console.log(e.response.data)
        )
    }
}


type GetPacksType = ReturnType<typeof getPacksAC>
type SetSearchPacks = ReturnType<typeof setSearchPacks>

