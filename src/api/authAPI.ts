import axios from 'axios'

type LogOutResponse = {
    info: string
    error: string
}
export type ResponseServerType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: string      //Date
    updated: string    //Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error: string
}

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://neko-back.herokuapp.com/2.0"
  //baseURL: "http://localhost:7542/2.0/"
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<ResponseServerType>('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete<LogOutResponse>('auth/me')
    },
    authMe() {
        return instance.post<ResponseServerType>('auth/me')
    }
}