import React from 'react';
import s from './Restore.module.scss'
import Input from "../../../Components/Input/Input";
import LoginForm from '../LoginPage/LoginForm';
import Button from "../../../Components/Button/Button";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {InitialRestoreStateType, RestoreTC} from '../../../store/RestoreReducer';
import {StateType} from "../../../store/redux-store";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type RestoreProps = {}

export type RestoreFormInput = {
    email: string;
}

export const schema = yup.object().shape({
    email: yup.string().required().email(),
});

const Restore = (props: RestoreProps) => {
    const dispatch = useDispatch()
    const restore = useSelector<StateType, InitialRestoreStateType>(state => state.restore)

    const {control, handleSubmit, errors} = useForm<RestoreFormInput>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: RestoreFormInput) => {
        dispatch(RestoreTC(data))
    };

    if (restore.responseLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={s.restorePage}>
            <div>
                <LoginForm className={s.loginBlock}/>
            </div>
            <div className={s.restoreBlock}>
                <h1>Forgot you password?</h1>
                {restore.success
                    ? <h2>Link on email</h2>
                    : <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            as={<Input onChange={() => errors.email?.message === null} error={errors.email?.message || restore.error} label={'Enter your login'}/>}
                            name="email"
                            control={control}
                            defaultValue=""
                        />

                        {errors.email?.message || restore.error}

                        <Button disable={restore.responseLoading} title={'SEND'}/>
                    </form>
                }

            </div>

        </div>
    )
}

export default Restore