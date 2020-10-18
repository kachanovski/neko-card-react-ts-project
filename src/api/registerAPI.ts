import axios from 'axios'
import { RegisterUserDataType} from "../store/RegisterReducer";

const instance = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:7542/2.0/"
})

type RegisterResponseType={
    addedUser:RegisterUserDataType
    error:string
}

export type PostType = {
    email:string
    password:string
}

export const RegisterAPI = {
    RegisterUser:(data:PostType)=>{
        return instance.post<RegisterResponseType>('auth/register/', data).then(res=>res)}
}