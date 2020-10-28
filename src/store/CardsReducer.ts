import {Dispatch} from "redux";
import {isFetching} from "./isFetchingReducer";
import {CardsAPI} from "../api/CardAPI";

export type ActionsType =
    GetCardsType |
    AddCardType |
    GetCardsTotalCountType

export type CardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type: string
}

export type CardsInitialStateType = {
    cards: Array<CardType>
    packUser_id: string
    cardsTotalCount: number | null
}

let CardsInitialState: CardsInitialStateType = {
    cards: [],
    packUser_id: '',
    cardsTotalCount: null
}


export const CardsReducer = (state = CardsInitialState, action: ActionsType) => {
    switch (action.type) {
        case "CARDS/GET_CARDS": {
            return {
                ...state,
                cards: action.cards
            }
        }
        case "CARDS/GET_CARDS_TOTAL_COUNT": {
            return {
                ...state,
                cardsTotalCount: action.cardsTotalCount
            }
        }
        case "CARDS/ADD_CARD": {
            return {
                ...state,
                ...state.cards,
                cards: action.card, ...state.cards
            }
        }
        default:
            return state
    }
}

export const getCardsAC = (cards: Array<CardType>) => {
    return {
        type: "CARDS/GET_CARDS", cards
    } as const
}

export const getCardsTotalCount = (cardsTotalCount: number) => {
    return {
        type: 'CARDS/GET_CARDS_TOTAL_COUNT', cardsTotalCount
    } as const
}

export const addCardAC = (card: CardType) => {
    return {
        type: 'CARDS/ADD_CARD', card
    } as const
}

export const getCards = (packId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        CardsAPI.getCards(packId).then(res => {
                dispatch(getCardsAC(res.data.cards))
                dispatch(getCardsTotalCount(res.data.cardsTotalCount))
                dispatch(isFetching(false))
            }
        ).catch(e => {
                console.log(e.response.data)
                dispatch(isFetching(false))
            }
        )
    }
}

export const addCard = (card: CardType) => {
    return (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        CardsAPI.addCard(card).then(res => {
                dispatch(addCardAC(card))
                dispatch(isFetching(false))
            }
        ).catch(e => {
                console.log(e.response.data)
                dispatch(isFetching(false))
            }
        )
    }
}
/*
export const deletePack = (packID: string) => {
    return async (dispatch: Dispatch) => {
        let deletePack = await PacksAPI.deletePack(packID)
        let myPacks = await PacksAPI.getMyPacks(deletePack.data.deletedCardsPack.user_id)
        dispatch(updPack(myPacks.data.cardPacks))
    }
}
export const updatePack = (_id: string, props: PacksType) => {
    return async (dispatch: Dispatch) => {
        let editPack = await PacksAPI.editPack({_id, ...props})
        let myPacks = await PacksAPI.getMyPacks(editPack.data.updatedCardsPack.user_id)
        dispatch(updPack(myPacks.data.cardPacks))
    }
}
*/


type GetCardsType = ReturnType<typeof getCardsAC>
type GetCardsTotalCountType = ReturnType<typeof getCardsTotalCount>
type AddCardType = ReturnType<typeof addCardAC>



