import React, {useCallback, useEffect} from 'react';
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Checkbox from "../../../Components/Checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/redux-store";
import {Controller, useForm} from "react-hook-form";
import {ErrorInType, setLogin, setError} from "../../../store/authReducers/LoginReducer";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import s from './Login.module.scss'
import {Redirect} from 'react-router-dom';

type LoginFormType = {
    className?: string
    isFetching: boolean
}
type FormType = {
    'login': string
    'password': string
    'rememberMe': boolean
}


export const schemaLogin = yup.object().shape({
    login: yup.string().required().email(),
    password: yup.string().required().min(7)
})

const LoginForm = React.memo((props: LoginFormType) => {

    const {register, control, handleSubmit, errors, reset} = useForm<FormType>({
        resolver: yupResolver(schemaLogin)
    })

    const dispatch = useDispatch()

    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const error = useSelector<StateType, string | null>(state => state.login.error)
    const errorIn = useSelector<StateType, ErrorInType | undefined>(state => state.login.errorIn)

    const onSubmit = useCallback(function (data: FormType) {
        dispatch(setLogin(data.login, data.password, data.rememberMe))
        if (authMe) {
            reset()
        }

    }, [dispatch, authMe, reset])

    useEffect(() => {
        dispatch(setError(error))
    }, [dispatch, error])

    const onBlur = ()=>{
        dispatch(setError(null))
    }

    if (authMe) return <Redirect to={'/profile'}/>

    return (
        <div className={props.className} onClick={onBlur}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    as={<Input onChange={() => errors.login?.message === null}
                               disable={props.isFetching}
                               error={errors.login?.message || error}
                               label={'login'}/>}
                    name="login"
                    control={control}
                    defaultValue="rozen19942810@gmail.com"
                />
                <p>{error}</p>
                <div className={s.errorMessageColor}>
                    {errors.login && <span>{errors.login.message}</span>}
                    {errorIn === "email" && <span>{error}</span>}
                </div>
                <Controller
                    as={<Input onChange={() => errors.login?.message === null}
                               disable={props.isFetching}
                               type={'password'}
                               error={errors.password?.message || error}
                               label={'password'}/>}
                    name="password"
                    control={control}
                    defaultValue="19942810"
                />
                <div className={s.errorMessageColor}>
                    {errors.password && <span>{errors.password.message}</span>}
                    {errorIn === "password" && <span>{error}</span>}
                </div>

                <Checkbox name={'rememberMe'} register={register} disable={props.isFetching}/>
                <Button title={'login'} disable={props.isFetching}/>
            </form>
        </div>
    )
})

export default LoginForm