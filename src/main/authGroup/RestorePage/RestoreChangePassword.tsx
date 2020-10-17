import React from 'react';
import s from './Restore.module.scss'
import Input from "../../../Components/Input/Input";
import LoginForm from '../LoginPage/LoginForm';
import Button from "../../../Components/Button/Button";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {ChangePasswordTC, InitialRestoreStateType} from "../../../store/RestoreReducer";
import {StateType} from "../../../store/redux-store";
import {Redirect} from "react-router-dom";

type ChangePasswordPropsType = {}

export type ChangePasswordFormInput = {
    password: string,
    repeat_password: string
}

const RestoreChangePassword = (props: ChangePasswordPropsType) => {
    const restore = useSelector<StateType, InitialRestoreStateType>(state => state.restore)
    const dispatch = useDispatch()

    const {control, handleSubmit} = useForm<ChangePasswordFormInput>();

    const onSubmit = (data: ChangePasswordFormInput) => {
        dispatch(ChangePasswordTC(data))
    };

    if (restore.success) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.restorePage}>
            <div>
                <LoginForm className={s.loginBlock}/>
            </div>

            <div className={s.restoreBlock}>
                <h1>Please, set your new Password</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        as={<Input error={restore.error} label={'password'}/>}
                        name="password"
                        control={control}
                        defaultValue=""
                    />
                    <Controller
                        as={<Input error={restore.error} label={'repeat password'}/>}
                        name="repeat_password"
                        control={control}
                        defaultValue=""
                    />
                    <Button disable={restore.responseLoading} title={'SEND'}/>
                </form>
            </div>

        </div>
    )
}

export default RestoreChangePassword