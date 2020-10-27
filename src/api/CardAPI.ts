import axios from "axios";

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
export type EditPackType = { _id: string } & PacksType

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://neko-back.herokuapp.com/2.0/`
    // baseURL: "http://localhost:7542/2.0/"
})

export const CardsAPI = {
    getCards: (packId: string) => {
        return instance.get(
            `cards/card?cardsPack_id=${packId}`
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
    addCard: () => {
        return instance.post('/cards/card', {})  //{cardPack: type}
    },
    deleteCard: (cardId: string) => {
        return instance.delete(`/cards/pack?id=${cardId}`)
    },
    updateCard: () => {
        return instance.put('/cards/pack', {}) //{cardPack:{id,question} type}
    }
}