import React from "react";
import s from './Input.module.scss'

const Input = (props: any) => {
    return (
        <div className={s.inputBody}>
            <input/>
            <label>Password</label>
        </div>
    )
}

export default Input