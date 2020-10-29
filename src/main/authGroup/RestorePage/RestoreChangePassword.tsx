import React, {useEffect} from 'react';
import s from './Restore.module.scss'
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {ChangePasswordTC, InitialRestoreStateType, setErrorRestore} from "../../../store/authReducers/RestoreReducer";
import {StateType} from "../../../store/redux-store";
import {Redirect} from "react-router-dom";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type ChangePasswordPropsType = {
    isFetching: boolean
}

export type ChangePasswordFormInput = {
    password: string,
    confirm_password: string
}

export const schema = yup.object().shape({
    password: yup.string().required().min(7),
});


const RestoreChangePassword = React.memo((props: ChangePasswordPropsType) => {
        const restore = useSelector<StateType, InitialRestoreStateType>(state => state.restore)
        const dispatch = useDispatch()

        const {control, handleSubmit, errors, reset, setError} = useForm<ChangePasswordFormInput>({
            resolver: yupResolver(schema)
        });

        const onSubmit = (data: ChangePasswordFormInput) => {
            if (data.password === data.confirm_password) {
                dispatch(ChangePasswordTC(data))
                reset()
            } else {
                setError('password', {message: 'Пароли не совпадают'})
                setError('confirm_password', {message: 'Пароли не совпадают'})
            }
        };

        useEffect(() => {
            dispatch(setErrorRestore(null))
        },[dispatch])

        if (restore.success) {
            return <Redirect to={'/login'}/>
        }

        return (
            <div className={s.restorePage}>
                <div className={s.restoreBlock}>
                    <h1>Please, set your new Password</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            as={<Input error={restore.error}
                                       type={'password'}
                                       label={'password'}/>}
                            name="password"
                            control={control}
                            defaultValue=""
                        />

                        <Controller
                            as={<Input error={errors.password?.message || restore.error}
                                       type={'password'}
                                       label={'repeat password'}/>}
                            name="confirm_password"
                            control={control}
                            defaultValue=""
                        />
                        <div className={s.errorMessageColor}>
                            {errors.password?.message || restore.error}
                        </div>
                        <Button disable={props.isFetching} title={'SEND'}/>
                    </form>
                </div>

            </div>
        )
    }
)

export default RestoreChangePassword