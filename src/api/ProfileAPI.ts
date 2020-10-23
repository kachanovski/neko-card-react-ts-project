import axios from "axios";
import { ProfileDataType } from "../store/ProfileReducer";


const instance = axios.create({
    withCredentials:true,
    baseURL: "https://neko-back.herokuapp.com/2.0"
})

export const ProfileAPI = {
    GetProfile:(data: {})=>{
        return instance.post<ProfileDataType>('auth/me', data).then(res=>
            res.data
        )
    }
}