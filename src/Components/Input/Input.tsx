import React from "react";
import s from './Input.module.scss'

type InputType = {
    label?: string
}

const Input = (props: InputType) => {
    return (
        <div className={s.inputBody}>
            <input/>
            <label>{props.label}</label>
        </div>
    )
}

export default Input