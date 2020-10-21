import React, {useCallback} from 'react';
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Checkbox from "../../../Components/Checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/redux-store";
import {useForm} from "react-hook-form";
import {ErrorInType, setLogin} from "../../../store/LoginReducer";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import s from './Login.module.scss'
import {Redirect} from 'react-router-dom';
import Preloader from "../../../Components/Preloader/Preloader";

type LoginFormType = {
    className?: string
}
type FormType = {
    'login': string
    'password': string
    'rememberMe': boolean
}


const LoginForm = React.memo((props: LoginFormType) => {

    const schemaLogin = yup.object().shape({
        login: yup.string().required().email(),
        password: yup.string().required().min(7)
    })

    const {register, handleSubmit, errors, reset} = useForm<FormType>({
        resolver: yupResolver(schemaLogin)
    })

    const dispatch = useDispatch()

    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const error = useSelector<StateType, string>(state => state.login.error)
    const errorIn = useSelector<StateType, ErrorInType | undefined>(state => state.login.errorIn)
    // const isFetch = useSelector<StateType, boolean>(state => state.login.isFetching)
    const disable = useSelector<StateType, boolean>(state => state.disable.disable)
    const loading = useSelector<StateType, boolean>(state => state.loading.isLoading)

    const onSubmit = useCallback(function (data: FormType) {
        dispatch(setLogin(data.login, data.password, data.rememberMe))
        reset()
    }, [authMe])

    console.log('LoginForm (authMe): ', authMe)
    if (authMe) return <Redirect to={'/profile'}/>
    return (
        <>
            {loading && <Preloader/>}
            <div className={props.className}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label={'Login'}
                        error={error}
                        name={'login'}
                        register={register}
                        disable={disable}
                    />
                    {errors.login && <span className={s.errorField}>{errors.login.message}</span>}
                    {errorIn === "email" && <span className={s.errorField}>{error}</span>}
                    <Input
                        type={'password'}
                        label={'Password'}
                        error={error}
                        name={'password'}
                        register={register}
                        disable={disable}
                    />
                    {errors.password && <span className={s.errorField}>{errors.password.message}</span>}
                    {errorIn === "password" && <span className={s.errorField}>{error}</span>}
                    <Checkbox name={'rememberMe'} register={register} disable={disable}/>
                    <Button title={'login'} disable={disable}/>
                </form>
            </div>
        </>
    )
})

export default LoginForm