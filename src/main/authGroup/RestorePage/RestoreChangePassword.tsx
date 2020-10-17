import React from 'react';
import s from './Restore.module.scss'
import Input from "../../../Components/Input/Input";
import LoginForm from '../LoginPage/LoginForm';
import Button from "../../../Components/Button/Button";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {ChangePasswordTC, InitialRestoreStateType, setError} from "../../../store/RestoreReducer";
import {StateType} from "../../../store/redux-store";
import {Redirect} from "react-router-dom";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type ChangePasswordPropsType = {}

export type ChangePasswordFormInput = {
    password: string,
    repeat_password: string
}

export const schema = yup.object().shape({
    password: yup.string().required().min(7),
});


const RestoreChangePassword = (props: ChangePasswordPropsType) => {
    const restore = useSelector<StateType, InitialRestoreStateType>(state => state.restore)
    const dispatch = useDispatch()

    const {control, handleSubmit, errors} = useForm<ChangePasswordFormInput>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: ChangePasswordFormInput) => {
        if (data.password === data.repeat_password){
            dispatch(ChangePasswordTC(data))
        }
        else dispatch(setError('Password must be identical '))
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
                        as={<Input error=  {errors.password?.message || restore.error} label={'repeat password'}/>}
                        name="repeat_password"
                        control={control}
                        defaultValue=""
                    />

                    {errors.password?.message || restore.error}
                    <Button disable={restore.responseLoading} title={'SEND'}/>
                </form>
            </div>

        </div>
    )
}

export default RestoreChangePassword