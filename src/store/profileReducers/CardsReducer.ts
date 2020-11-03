import {Dispatch} from "redux";
import {isFetching} from "../isFetchingReducer";
import {CardsAPI} from "../../api/ProfileAPI/CardAPI";

export type ActionsType =
    GetCardsType |
    AddCardType |
    GetCardsTotalCountType |
    SetCardGrade

export type CardType = {
    cardsPack_id?: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
    _id?: string
    comments?: string
    user_id?: string
}


export type CardsInitialStateType = {
    cards: Array<CardType>
    cardsPack_id: string | undefined
    cardsTotalCount?: number | null
}

let CardsInitialState: CardsInitialStateType = {
    cards: [],
    cardsPack_id: '',
    cardsTotalCount: null
}


export const CardsReducer = (state = CardsInitialState, action: ActionsType): CardsInitialStateType => {
    switch (action.type) {
        case "CARDS/GET_CARDS": {
            return {
                ...state,
                cardsPack_id: action.cards[0].cardsPack_id,
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
                cards: [action.card, ...state.cards]
            }
        }
        case "CARDS/SET_GRADE": {
            return {
                ...state,
                cards: state.cards.map(c => c._id === action._id ? {...c, grade: action.grade} : c)
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

export const setCardGrade = (grade: number, _id: string) => {
    return {
        type: 'CARDS/SET_GRADE', grade, _id
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
                console.log('ERROR: ', e.message)
                dispatch(isFetching(false))
            }
        )
    }
}

export const addCard = (card: CardType, cardsPack_id: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(isFetching(true))
        await CardsAPI.addCard(card)
        dispatch(getCards(cardsPack_id))
        dispatch(isFetching(false))

    }
}
export const deleteCard = (card: CardType, cardsPack_id: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(isFetching(true))
        await CardsAPI.deleteCard(card._id)
        dispatch(getCards(cardsPack_id))
        dispatch(isFetching(false))
    }
}
export const updateCard = (card: CardType, cardsPack_id: string) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(isFetching(true))
        await CardsAPI.updateCard(card)
        dispatch(getCards(cardsPack_id))
        dispatch(isFetching(false))
    }
}
export const setGrade = (grade: number, card_id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(isFetching(true))
        try {
            let response = await CardsAPI.setCardGrade(grade, card_id)
            console.log(response.data.updatedGrade)
            dispatch(setCardGrade(response.data.updatedGrade.grade, response.data.updatedGrade.card_id))
        } catch (e) {
            console.log('ERROR: ', e.message)
        } finally {
            dispatch(isFetching(false))
        }
    }
}


type GetCardsType = ReturnType<typeof getCardsAC>
type GetCardsTotalCountType = ReturnType<typeof getCardsTotalCount>
type AddCardType = ReturnType<typeof addCardAC>
type SetCardGrade = ReturnType<typeof setCardGrade>



