import React from 'react';
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Checkbox from "../../../Components/Checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/redux-store";
import {useForm} from "react-hook-form";
import {setLogin} from "../../../store/LoginReducer";

type LoginFormType = {
    className?: string
}
type FormType = {
    'login': string
    'password': string
    'rememberMe': boolean
}



const LoginForm = (props: LoginFormType) => {

    const {register, handleSubmit, errors} = useForm<FormType>()

    const dispatch = useDispatch()

    const error = useSelector<StateType, string>(state => state.login.error)
    const isFetch = useSelector<StateType, boolean>(state => state.login.isFetching)


    const onSubmit = (data: FormType) => {
        dispatch(setLogin(data.login,data.password,data.rememberMe))
    }

    return (
        <div className={props.className}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label={'Login'}
                    error={error}
                    name={'login'}
                    register={register}
                    disable={isFetch}
                />
                {errors.login && <span>{errors.login.message}</span>}
                <Input
                    type={'password'}
                    label={'Password'}
                    error={error}
                    name={'password'}
                    register={register}
                    disable={isFetch}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <Checkbox name={'rememberMe'} register={register} disable={isFetch}/>
                <Button title={'login'} disable={isFetch}/>
            </form>
        </div>
    )
}

export default LoginForm