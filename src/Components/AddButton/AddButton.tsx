import React from "react";
import addButton from '../../accets/images/add_insert_icon_155858.png'
import s from "./AddButton.module.scss";

type AddButtonProps = {
   onClick?: () => void
}

const AddButton = (props: AddButtonProps) => {
    return (
        <div className={s.addButton}>
            <img alt={'delete'} src={addButton} onClick={props.onClick}/>
        </div>
    )
}

export default AddButton