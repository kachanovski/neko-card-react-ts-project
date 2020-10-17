import React from 'react'
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import s from "./Register.module.scss";
import {InputForm} from "../../../Components/Input/InputHOC";
import Button from "../../../Components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {initialStateType, RegisterUserTC, SetErrorMessageAC} from "../../../store/RegisterReducer";
import {StateType} from "../../../store/redux-store";
import {Redirect} from "react-router-dom";
import err from "../../../Components/Input/Input.module.scss"


export const schema = yup.object().shape({
    password: yup.string().required().min(7),
    email: yup.string().required().email(),
    confirm_password: yup.string().required().min(7)
});

export const RegisterWithHookForm = React.memo(() => {

    const dispatch = useDispatch()

    const newUserData = useSelector<StateType, initialStateType>(state => state.register)

    type FormsType = {
        "confirm_password": string
        "password": string
        "email": string
    }

    const {register, handleSubmit, errors, reset} = useForm<FormsType>(
        {
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = (data: FormsType) => {
        if (data.confirm_password === data.password) {
            let newData = {
                email: data.email,
                password: data.password
            }
            dispatch(RegisterUserTC(newData))
            console.log(newData);
            reset()
        } else {
            dispatch(SetErrorMessageAC('Пароли не совпадают'))
        }
    }

    const onBlur = () => {
        dispatch(SetErrorMessageAC(''))
    }

    return (
        <>
            {newUserData.data.email.length > 0 && <Redirect to={'/login'}/>}
            <div className={s.registerPage} onBlur={onBlur}>
                <div className={s.registerBox}>
                    <h1>REGISTER</h1>
                    {newUserData.errorMessage ? <div>{newUserData.errorMessage}</div> : null}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={newUserData.errorMessage || errors.email ? err.error : ''}>
                            <InputForm
                                register={register}
                                label='email'
                                type={'text'}
                                placeholder={'email'}
                            />
                            {errors.email?.message}
                        </div>
                        <div className={newUserData.errorMessage || errors.password ? err.error : ''}>
                            <InputForm
                                register={register}
                                label='password'
                                type={'password'}
                                placeholder={'password'}
                            />
                            {errors.password?.message}
                        </div>
                        <div className={newUserData.errorMessage || errors.password ? err.error : ''}>
                            <InputForm
                                register={register}
                                label='confirm_password'
                                type={'password'}
                                placeholder={'confirm password'}
                            />
                            {errors.confirm_password?.message}
                        </div>
                        <Button title={"SEND"} disable={newUserData.registerFetching}/>
                    </form>
                </div>
            </div>
        </>
    )
})
