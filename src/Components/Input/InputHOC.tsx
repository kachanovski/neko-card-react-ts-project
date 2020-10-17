import React from "react";
import s from './Input.module.scss'


type RefReturn =
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & {
    label: string;
    register: ({required}: { required?: boolean }) => RefReturn;
};


export const InputForm: React.FC<InputProps> = ({label, register, required, placeholder,type}) => {
    return (
        <div className={ s.inputBody}>
            <input
                name={label}
                ref={register({ required })}
                placeholder={placeholder}
                type={type}
                />
        </div>
    )
}