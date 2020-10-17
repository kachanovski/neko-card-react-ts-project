import React, {ChangeEvent, RefObject} from 'react';
import s from './Checkbox.module.scss'

export type RefType = string | ((instance: HTMLInputElement | null) => void) | RefObject<HTMLInputElement> | null | undefined
type CheckboxType = {
    checked?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    name?: string
    register?:  RefType
    disable?: boolean
}

const Checkbox = (props: CheckboxType) => {
    return (
        <div >
            <input  checked={props.checked}
                    onChange={props.onChange}
                    className={s.checkbox}
                    type={'checkbox'}
                    name={props.name}
                    ref={props.register}
                    disabled={props.disable}
            />
        </div>
    )
}

export default Checkbox