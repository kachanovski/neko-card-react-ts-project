import React from "react";
import s from './ModalWindow.module.scss'
import Input from "../../../Components/Input/Input";

type ModalWindowPropsType = {
    setShowModalWindow: (showModalWindow: boolean) => void
}

export const ModalWindow = (props: ModalWindowPropsType) => {
    return (
        <div className={s.modalWindowContainer}>
            <div className={s.modalWindow}>
                <h3>Add card</h3>
                <Input label={'card name'}/>
                <button>SEND</button>
                <button onClick={() => props.setShowModalWindow(false)}>CLOSE</button>
            </div>
        </div>
    )
}

