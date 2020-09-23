import React from 'react';
import s from './Restore.module.scss'
import Input from "../../Components/Input/Input";
import LoginForm from '../LoginPage/LoginForm';

const Restore = (props: any) => {

    return (
        <div className={s.restorePage}>
            <div>
                <LoginForm className={s.loginBlock}/>
            </div>

            <div className={s.restoreBlock}>
                <h1>Forgot you password?</h1>
                <h1>Dont worry</h1>
                <Input/>
            </div>

        </div>
    )
}

export default Restore