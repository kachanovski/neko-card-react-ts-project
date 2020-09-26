import React, {ChangeEvent} from 'react';
import s from './Checkbox.module.scss'

type CheckboxType = {
    checked?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = (props: CheckboxType) => {
    return (
        <div >
            <input  checked={props.checked}
                    onChange={props.onChange}
                    className={s.checkbox}
                    type={'checkbox'}/>
        </div>
    )
}

export default Checkbox