import React from 'react'
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import s from "./Register.module.scss";
import {InputForm} from "../../../Components/Input/InputHOC";
import Button from "../../../Components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {initialStateType, RegisterUserTC, SetRegisterDataAC} from "../../../store/RegisterReducer";
import {StateType} from "../../../store/redux-store";
import { Redirect } from "react-router-dom";

export const schema = yup.object().shape({
    password: yup.string().required().min(5),
    email: yup.string().required().email(),
});

export const RegisterWithHookForm = React.memo(() => {

    const dispatch = useDispatch()

    const newUserData = useSelector<StateType, initialStateType>(state => state.register)

    type FormsType = {
        "password": string
        "email": string
    }

    const {register, handleSubmit, watch, errors} = useForm<FormsType>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: FormsType) => {
        dispatch(RegisterUserTC(data))
        console.log(data);
    }

    return (
        <>
            {newUserData.email && <Redirect to={'/login'}/>}
            <div className={s.registerPage}>
                <div className={s.registerBox}>
                    <h1>REGISTER</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <InputForm
                                register={register}
                                label='email'
                                type={'text'}
                                placeholder={'email'}
                            />
                            {errors.email?.message}
                        </div>
                        <div className={errors ? s.error : s.inputBody}>
                            <InputForm
                                register={register}
                                label='password'
                                type={'password'}
                                placeholder={'password'}
                            />
                            {errors.password?.message}
                        </div>
                        <Button title={"SEND"}/>
                    </form>
                </div>
            </div>
        </>
    )
})
