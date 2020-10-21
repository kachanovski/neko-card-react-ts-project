import axios from 'axios'
import {RestoreFormInput} from "../main/authGroup/RestorePage/Restore";
import {ChangePasswordFormInput} from "../main/authGroup/RestorePage/RestoreChangePassword";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:7542/2.0/"
    // baseURL: "https://neko-back.herokuapp.com/2.0"
})
type RestoreResponseType = {
    answer: boolean,
    html: boolean,
    info: string
    success: boolean
}
type ChangePasswordResponseType = {
    info: string
}

export type PostType = {
    email: string
    password: string
}


export const RestoreApi = {
    restore(data: RestoreFormInput) {
        const email = data.email
        return instance.post<RestoreResponseType>('auth/forgot', {
            email,
            message: `<div style="background-color: lime; padding: 15px">
                          password recovery link: 
                          <a href='http://localhost:3000/neko-card-react-ts-project#/changePassword/$token$'>link</a>
                      </div> `
        })
    },
    changePassword(data: ChangePasswordFormInput) {
        const passwordToken = window.location.href.split('/')[5]
        const password = data.confirm_password
        return instance.post<ChangePasswordResponseType>('auth/set-new-password', {password: password, resetPasswordToken: passwordToken})
    }
}