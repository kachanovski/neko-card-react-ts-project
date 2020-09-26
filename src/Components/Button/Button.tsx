import React from 'react';
import s from './Button.module.scss'

type ButtonType = {
    title?: string
    onClick?: () => void
}

const Button = (props: ButtonType) => {
    return (
        <div className={s.loginButtonBody}>
            <span className={s.link}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <button onClick={props.onClick} className={s.button}>
                    {props.title}
                </button>
            </span>
        </div>
    )
}

export default Button