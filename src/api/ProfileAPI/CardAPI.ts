import {CardType} from "../../store/profileReducers/CardsReducer";
import {instance} from "../instance";

export type EditPackType = { _id: string | undefined } & CardType

export const CardsAPI = {
    getCards: (packId: string) => {
        return instance.get(
            `cards/card?cardsPack_id=${packId}&pageCount=100`
            /*`?cardAnswer=''` +
            `&cardQuestion=''` +*/
             /*+
            `&min=''` +
            `&max=''` +
            `&sortCards=0grade` +
            `&page=1` +
            `&pageCount=7`*/
        );
    },
    addCard: (card: CardType) => {
        return instance.post('/cards/card', {card})
    },
    deleteCard: (cardId: string | undefined) => {
        return instance.delete(`/cards/card?id=${cardId}`)
    },
    updateCard: (card: EditPackType) => {
        return instance.put('/cards/card', {card})
    }
}