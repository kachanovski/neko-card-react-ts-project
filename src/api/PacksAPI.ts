import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://neko-back.herokuapp.com/2.0"
    //baseURL: "http://localhost:7542/2.0/"
})

export const PacksAPI = {
    getPacks: (searchName: string) => {
        return instance.get(
            `/cards/pack?packName=${searchName}$&pageCount=400&page=1&sortPacks=0updated`
        );
    }
}