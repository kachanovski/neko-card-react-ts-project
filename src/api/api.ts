import axios from 'axios'
import {initialStateType} from "../store/RegisterReducer";

const instance = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:7542/2.0/"
})

type RegisterResponseType={
    addedUser:initialStateType
    error:string
}

export const RegisterAPI = {
    RegisterUser:(data:initialStateType)=>{
        return instance.post<RegisterResponseType>('auth/register/', data).then(res=>res.data)
    }
}