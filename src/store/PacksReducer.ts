import {Dispatch} from "redux";
import {EditPackType, PacksType, PacksAPI} from "../api/PacksAPI";

export type ActionsType = GetPacksType | SetSearchPacks | UpdPacksType

export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
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
        case "PACKS/ADD_PACK": {
            return {
                ...state,
                packs: action.data, ...state.packs
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

export const updPack = (data: Array<PackType>) => {
    return {
        type: 'PACKS/ADD_PACK', data
    } as const
}

export const editPackAC = () => {
    return {
        type: 'PACKS/EDIT_PACK'
    }
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

export const addPacks = (name?: string, type?: string) => {
    return async (dispatch: Dispatch) => {
        let promise = await PacksAPI.addPacks({name, type})
        let getPacks = await PacksAPI.getMyPacks(promise.data.newCardsPack.user_id)
        dispatch(updPack(getPacks.data.cardPacks))
    }
}

export const showMyPacksTC = (userID: string) => {
    return async (dispatch: Dispatch) => {
        let myPacks = await PacksAPI.getMyPacks(userID)
        dispatch(updPack(myPacks.data.cardPacks))
    }
}
export const deletePack = (packID: string) => {
    return async (dispatch: Dispatch) => {
        let deletePack = await PacksAPI.deletePack(packID)
        let myPacks = await PacksAPI.getMyPacks(deletePack.data.deletedCardsPack.user_id)
        dispatch(updPack(myPacks.data.cardPacks))
    }
}
export const editPack = (_id: string, props: PacksType) => {
    return async (dispatch: Dispatch) => {
        let editPack = await PacksAPI.editPack({_id,...props})
        let myPacks = await PacksAPI.getMyPacks(editPack.data.updatedCardsPack.user_id)
        dispatch(updPack(myPacks.data.cardPacks))
    }
}


type UpdPacksType = ReturnType<typeof updPack>
type GetPacksType = ReturnType<typeof getPacksAC>
type SetSearchPacks = ReturnType<typeof setSearchPacks>

