import React from 'react';
import s from './Button.module.scss'

type ButtonType = {
    title?: string
    onClick?: () => void
    disable?: boolean
}

const Button = (props: ButtonType) => {
    return (
        <div className={s.loginButtonBody}>
            <span className={s.link}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <button onClick={props.onClick} disabled={props.disable} className={s.button}>
                    {props.title}
                </button>
            </span>
        </div>
    )
}

export default Button