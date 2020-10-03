import React from 'react';
import s from './Restore.module.scss'
import Input from "../../../Components/Input/Input";
import LoginForm from '../LoginPage/LoginForm';
import Button from "../../../Components/Button/Button";
import {NavLink} from 'react-router-dom';

type RestoreProps = {}

const Restore = (props: RestoreProps) => {
    return (
        <div className={s.restorePage}>
            <div>
                <LoginForm className={s.loginBlock}/>
            </div>
            <div className={s.restoreBlock}>
                <h1>Forgot you password?</h1>
                <h1>Dont worry</h1>
                <Input label={'Enter your login'}/>
                <NavLink to={'/restore/changePassword'}>
                    <Button title={'SEND'}/>
                </NavLink>
            </div>

        </div>
    )
}

export default Restore