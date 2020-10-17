import React from 'react';
import s from './Login.module.scss'
import {NavLink} from 'react-router-dom';
import LoginForm from "./LoginForm";

type LoginType = {

}

const Login = (props: LoginType) => {

    return (
        <div className={s.loginPage}>
            <div className={s.loginFormContainer} >
                <h1> LOGIN </h1>
                <LoginForm className={s.loginFormContainer} />
                <div className={s.items}>
                    <NavLink className={s.text1} to='/restore'>Forgot your password?</NavLink>
                    <NavLink className={s.text} to='/register'>Register</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Login