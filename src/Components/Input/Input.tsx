import React, {ChangeEvent} from "react";
import s from './Input.module.scss'

type InputType = {
    label?: string
    type?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string | null
}

const Input = (props: InputType) => {

    return (
        <div className={props.error ? s.error : s.inputBody}>
            <input value={props.value}
                   type={props.type}
                   onChange={props.onChange}/>

            {!props.value ? <label>{props.label}</label> : ''}
        </div>
    )
}

export default Input