import {Dispatch} from "redux";
import {ProfileAPI} from "../../api/ProfileAPI/ProfileAPI";

export type ActionsType =
    SetProfileUserDataAcType


export type ProfileDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error: string;
} | null

let ProfileInitialState: ProfileDataType = null

export const ProfileReducer = (state = ProfileInitialState, action: ActionsType) => {
    switch (action.type) {
        case "PROFILE/SET-PROFILE-USER-DATA": {
            return {
                ...state, ...action.data
            }
        }
        default:
            return state
    }
}

export const SetProfileUserDataAC = (data: ProfileDataType) => {
    return {
        type: "PROFILE/SET-PROFILE-USER-DATA", data
    } as const
}

export const GetProfileDataTC = () => {
    return (dispatch: Dispatch) => {
        ProfileAPI.GetProfile({}).then(res => {
            if (!res?.error) {
                dispatch(SetProfileUserDataAC(res))
            }
        }).catch(e => {
            }
        )
    }
}



type SetProfileUserDataAcType = ReturnType<typeof SetProfileUserDataAC>

