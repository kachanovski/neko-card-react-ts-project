import {ProfileDataType} from "../../store/profileReducers/ProfileReducer";
import {instance} from "../instance";


export const ProfileAPI = {
    GetProfile:(data: {})=>{
        return instance.post<ProfileDataType>('auth/me', data).then(res=>
            res.data
        )
    }
}