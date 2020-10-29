import {Dispatch} from "redux";
import {PacksType, PacksAPI} from "../../api/ProfileAPI/PacksAPI";
import {isFetching} from "../isFetchingReducer";

export type ActionsType =
    GetPacksType
    | SetSearchPacks
    | UpdPacksType
    | SetSortPacksNameUp
    | SetSortPacksNameDown
    | cardsPacksTotalCountType
    | setPageType

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
    searchName: string
    cardsPacksTotalCount: number
    maxCardsCount?: number | null
    minCardsCount?: number
    page: number
    pageCount: number
}

let PacksInitialState: PacksInitialStateType = {
    packs: [],
    packUser_id: '',
    searchName: '',
    page: 1,
    pageCount: 10,
    cardsPacksTotalCount: 1000
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
                searchName: action.searchName,
            }
        }
        case "/PACKS/TOTAL-COUNT": {
            return {
                ...state,
                cardsPacksTotalCount: action.cardsPacksTotalCount
            }
        }
        case "/PACKS/SET-CURRENT-PAGE": {
            return {
                ...state,
                page: action.page
            }
        }

        case "/PACKS/SORT_PACKS_NAME_UP": {
            return {
                ...state,
                ...state.packs,
                packs: state.packs.sort(function (a, b) {
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
                packs: state.packs.sort(function (a, b) {
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

export const cardsPacksTotalCount = (cardsPacksTotalCount: number) => {
    return {
        type: '/PACKS/TOTAL-COUNT', cardsPacksTotalCount
    } as const
}

export const setSortPacksNameUp = () => {
    return {
        type: '/PACKS/SORT_PACKS_NAME_UP'
    } as const
}

export const setPage = (page: number) => {
    return {
        type: '/PACKS/SET-CURRENT-PAGE', page
    } as const
}

export const setSortPacksNameDown = () => {
    return {
        type: '/PACKS/SORT_PACKS_NAME_DOWN'
    } as const
}

export const updPack = (data: Array<PackType>) => {
    return {
        type: 'PACKS/ADD_PACK', data
    } as const
}


export const getPacks = (searchName: string, page?: number) => {
    return (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        PacksAPI.getPacks(searchName, page).then(res => {
                dispatch(getPacksAC(res.data.cardPacks))
                dispatch(isFetching(false))
                dispatch(setSearchPacks(searchName))
                dispatch(cardsPacksTotalCount(res.data.cardPacksTotalCount))
                dispatch(setPage(res.data.page))
            }
        ).catch(e => {
                console.log(e.response)
                dispatch(isFetching(false))
            }
        )
    }
}

export const sortPacksUp = (searchName: string) => {
    return (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        PacksAPI.getPacks(searchName).then(res => {
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

export const addPacks = (searchName: string, name?: string, type?: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(isFetching(true))
        await PacksAPI.addPacks({name, type})
        dispatch(getPacks(searchName))
        dispatch(isFetching(false))
    }
}

export const showMyPacksTC = (userID: string) => {
    return async (dispatch: Dispatch) => {
        let myPacks = await PacksAPI.getMyPacks(userID)
        dispatch(updPack(myPacks.data.cardPacks))
    }
}
export const deletePack = (packID: string, searchName: string) => {
    return async (dispatch: Dispatch<any>) => {
        await PacksAPI.deletePack(packID)
        dispatch(getPacks(searchName))
        dispatch(isFetching(false))
    }
}
export const editPack = (_id: string, props: PacksType, searchName: string) => {
    return async (dispatch: Dispatch<any>) => {
        await PacksAPI.editPack({_id, ...props})
        dispatch(getPacks(searchName))
        dispatch(isFetching(false))
    }
}


type UpdPacksType = ReturnType<typeof updPack>
type GetPacksType = ReturnType<typeof getPacksAC>
type SetSearchPacks = ReturnType<typeof setSearchPacks>
type SetSortPacksNameUp = ReturnType<typeof setSortPacksNameUp>
type SetSortPacksNameDown = ReturnType<typeof setSortPacksNameDown>
type cardsPacksTotalCountType = ReturnType<typeof cardsPacksTotalCount>
type setPageType = ReturnType<typeof setPage>

