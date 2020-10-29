import {RegisterUserDataType} from "../../store/authReducers/RegisterReducer";
import {instance} from "../instance";

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
        return instance.post<RegisterResponseType>('auth/register/', data)}
}