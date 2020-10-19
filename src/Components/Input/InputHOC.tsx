import React from "react";
import s from './Input.module.scss'
import {ValidationRule, ValidationRules} from "react-hook-form/dist/types/validator";
import {FieldName, Ref} from "react-hook-form/dist/types/fields";

type RefReturn =
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> & {
    label: string;
    register: (
        {required}: { required?: boolean },
        {pattern}: {pattern?:ValidationRule<RegExp>}
        ) => RefReturn;
};

export const InputForm: React.FC<InputProps> = ({label, register, required, placeholder, type,pattern}, props) => {
    return (
        <div className={ props.error? s.error : s.inputBody}>
            <input
                name={label}
                ref={register({required}, {pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})}
                placeholder={placeholder}
                type={type}
            />
        </div>
    )
}