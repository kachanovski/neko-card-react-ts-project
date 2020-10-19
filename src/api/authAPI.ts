import axios from 'axios'


const instance = axios.create({
    withCredentials:true,
    baseURL: "http://localhost:7542/2.0/"
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean = false){
       return instance.post('/auth/login', {email, password, rememberMe})
    }
}