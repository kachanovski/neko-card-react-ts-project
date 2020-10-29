import axios from "axios";
import {CardType} from "../store/CardsReducer";

export type PacksType = {
    name?: string           //"no Name" если не отправить будет таким
    path?: string          // "/def" если не отправить будет такой
    grade?: number          // не обязателен
    shots?: number          // не обязателен
    rating?: number         // не обязателен
    deckCover?: string      //"url or base64", не обязателен
    private?: boolean       //false если не отправить будет такой
    type?: string           //"pack" если не отправить будет таким
}
export type EditPackType = { _id: string | undefined } & CardType

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://neko-back.herokuapp.com/2.0/`
    // baseURL: "http://localhost:7542/2.0/"
})

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