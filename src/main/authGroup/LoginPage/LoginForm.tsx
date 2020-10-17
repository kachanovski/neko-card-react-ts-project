import React from 'react';
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Checkbox from "../../../Components/Checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/redux-store";
import {useForm} from "react-hook-form";
import {InitialLoginReducerState, setLogin} from "../../../store/LoginReducer";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import s from './Login.module.scss'

type LoginFormType = {
    className?: string
}
type FormType = {
    'login': string
    'password': string
    'rememberMe': boolean
}

const schemaLogin = yup.object().shape({
    login: yup.string().required().email(),
    password: yup.string().required().min(7)
})


const LoginForm = (props: LoginFormType) => {

    const {register, handleSubmit, errors} = useForm<FormType>({
        resolver: yupResolver(schemaLogin)
    })

    const dispatch = useDispatch()

    const login = useSelector<StateType, InitialLoginReducerState>(state => state.login)
    const isFetch = useSelector<StateType, boolean>(state => state.login.isFetching)


    const onSubmit = (data: FormType) => {
        dispatch(setLogin(data.login, data.password, data.rememberMe))
    }

    return (
        <div className={props.className}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label={'Login'}
                    error={login.error}
                    name={'login'}
                    register={register}
                    disable={isFetch}
                />
                {errors.login && <span className={s.errorField}>{errors.login.message}</span>}
                {login.errorIn === "email" && <span className={s.errorField}>{login.error}</span>}
                <Input
                    type={'password'}
                    label={'Password'}
                    error={login.error}
                    name={'password'}
                    register={register}
                    disable={isFetch}
                />
                {errors.password && <span className={s.errorField}>{errors.password.message}</span>}
                {login.errorIn === "password" && <span className={s.errorField}>{login.error}</span>}
                <Checkbox name={'rememberMe'} register={register} disable={isFetch}/>
                <Button title={'login'} disable={isFetch}/>
            </form>
        </div>
    )
}

export default LoginForm