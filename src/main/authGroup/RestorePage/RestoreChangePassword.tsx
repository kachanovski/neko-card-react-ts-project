import React from 'react';
import s from './Restore.module.scss'
import Input from "../../../Components/Input/Input";
import LoginForm from '../LoginPage/LoginForm';
import Button from "../../../Components/Button/Button";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {ChangePasswordTC} from "../../../store/RestoreReducer";

type ChangePasswordPropsType = {}

export type ChangePasswordFormInput = {
    password: string,
    repeat_password: string
}

const RestoreChangePassword = (props: ChangePasswordPropsType) => {
    const dispatch = useDispatch()
    const {control, handleSubmit} = useForm<ChangePasswordFormInput>();

    const onSubmit = (data: ChangePasswordFormInput) => {
        dispatch(ChangePasswordTC(data))
    };

    return (
        <div className={s.restorePage}>
            <div>
                <LoginForm className={s.loginBlock}/>
            </div>

            <div className={s.restoreBlock}>
                <h1>Forgot you password?</h1>
                <h1>Dont worry</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        as={<Input error={'asd'} label={'password'}/>}
                        name="password"
                        control={control}
                        defaultValue=""
                    />
                    <Controller
                        as={<Input label={'repeat password'}/>}
                        name="repeat_password"
                        control={control}
                        defaultValue=""
                    />
                    <Button title={'SEND'}/>
                </form>
            </div>

        </div>
    )
}

export default RestoreChangePassword