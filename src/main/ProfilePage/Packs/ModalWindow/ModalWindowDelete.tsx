import React from "react";
import s from './ModalWindow.module.scss'

type ModalWindowDeletePropsType = {
    setShowModalWindowDelete: (showModalWindowDelete: boolean) => void
    onClick: () => void
}


export const ModalWindowDelete = (props: ModalWindowDeletePropsType) => {
    return (
        <div className={s.modalWindowContainer}>
            <div className={s.modalWindow}>
                <h3>Are you sure?</h3>
                <button onClick={props.onClick}>Yes</button>
                <button onClick={() => props.setShowModalWindowDelete(false)}>CLOSE</button>
            </div>
        </div>
    )
}

