import React from 'react';
import s from './Button.module.scss'
import {NavLink} from 'react-router-dom';

const Button = (props: any) => {
    return (
        <div className={s.loginButtonBody}>
            <NavLink className={s.link} to={'/profile'}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <button className={s.button}>
                    Submit
                </button>
            </NavLink>
        </div>
    )
}

export default Button