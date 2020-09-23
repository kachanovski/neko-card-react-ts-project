import React from 'react';
import s from './Login.module.scss'
import {NavLink} from 'react-router-dom';
import LoginForm from "./LoginForm";

type LoginFormType = {

}

const Login = (props: any) => {

    return (
        <div className={s.loginPage}>
            <div className={s.loginFormContainer} >
                <h1> LOGIN </h1>
                <LoginForm />
                <div>
                    <NavLink className={s.text1} to='/restore'>Forgot your password?</NavLink>
                </div>
                <div>
                    <NavLink className={s.text} to='/register'>Register</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Login