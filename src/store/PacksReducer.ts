import {Dispatch} from "redux";
import {PacksAPI} from "../api/PacksAPI";

export type ActionsType = getPacksType

export type PackType = {
    _id: string
    name: string
    email: string
}

export type PacksInitialStateType = {
    packs: Array<PackType>
    packUser_id: string
}

let PacksInitialState:PacksInitialStateType  = {
    packs: [],
    packUser_id: ''
}



export const PacksReducer = (state = PacksInitialState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/GET_PACKS": {
            return {
                ...state,
                packs: action.packs
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

export const getPacks = () => {
    return (dispatch: Dispatch) => {
        PacksAPI.getPacks().then(res => {
                dispatch(getPacksAC(res.data.cardPacks))
            }
        ).catch(e =>
            console.log(e.response.data)
        )
    }
}


type getPacksType = ReturnType<typeof getPacksAC>

