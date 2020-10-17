import React from 'react';
import s from './Restore.module.scss'
import Input from "../../../Components/Input/Input";
import LoginForm from '../LoginPage/LoginForm';
import Button from "../../../Components/Button/Button";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {InitialRestoreStateType, RestoreTC} from '../../../store/RestoreReducer';
import {AppRootStateType} from "../../../store/redux-store";

type RestoreProps = {}

export type RestoreFormInput = {
    email: string;
}

const Restore = (props: RestoreProps) => {
    const dispatch = useDispatch()
    const {control, handleSubmit} = useForm<RestoreFormInput>();
    const restore = useSelector<AppRootStateType, InitialRestoreStateType>(state => state.restore)

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
                {!restore.error
                    ? <h1>Forgot you password?</h1>
                    : <h2 className={s.errorMessage}>{restore.error}</h2>
                }

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        as={<Input error={restore.error} label={'Enter your login'}/>}
                        name="email"
                        control={control}
                        defaultValue=""
                    />
                    <Button disable={restore.responseLoading} title={'SEND'}/>
                </form>
            </div>

        </div>
    )
}

export default Restore