import React, {ChangeEvent} from "react";
import s from './Input.module.scss'
import {RefType} from "../Checkbox/Checkbox";

type InputType = {
    label?: string
    type?: string
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string | null
    register?: RefType
    name?: string
    disable?: boolean
}

const Input = (props: InputType) => {
    return (
        <div className={props.error ? s.error : s.inputBody}>
            <input value={props.value}
                   type={props.type}
                   onChange={props.onChange}
                   ref={props.register}
                   name={props.name}
                   disabled={props.disable}
                   placeholder={props.label}
            />

           {/* {!props.value ? <label>{props.label}</label> : ''}*/}
        </div>
    )
}

export default Input