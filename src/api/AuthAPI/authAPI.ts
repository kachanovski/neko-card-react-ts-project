import {instance} from '../instance'

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