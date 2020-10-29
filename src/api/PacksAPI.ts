import axios from "axios";

export type PacksType = {
    name?: string           //"no Name" если не отправить будет таким
    path?:  string          // "/def" если не отправить будет такой
    grade?: number          // не обязателен
    shots?: number          // не обязателен
    rating?: number         // не обязателен
    deckCover?: string      //"url or base64", не обязателен
    private?: boolean       //false если не отправить будет такой
    type?: string           //"pack" если не отправить будет таким
}
export type EditPackType = { _id: string} & PacksType

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://neko-back.herokuapp.com/2.0"
    // baseURL: "http://localhost:7542/2.0/"
})

export const PacksAPI = {
    getPacks: (searchName: string, page?:number) => {
        return instance.get(
            `/cards/pack?packName=${searchName}&pageCount=10&page=${page}&sortPacks=0updated`
        );
    },
    addPacks: (cardsPack: PacksType) => {
        return instance.post('/cards/pack', {cardsPack})
    },
    getMyPacks: (id: string) => {
        return instance.get(`/cards/pack?user_id=${id}&pageCount=100`)
    },
    deletePack: (packID: string) => {
        return instance.delete(`/cards/pack?id=${packID}`)
    },
    editPack: (cardsPack: EditPackType) => {
        return instance.put('/cards/pack', {cardsPack})
    }
}