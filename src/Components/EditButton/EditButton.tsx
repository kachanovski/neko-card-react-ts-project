import React from "react";
import editButton from '../../accets/images/edit_icon.png'
import s from "./EditButton.module.scss";

type EditButtonProps = {
   onClick?: () => void
}

const EditButton = (props: EditButtonProps) => {
    return (
        <div className={s.editButton}>
            <img alt={'delete'} src={editButton} onClick={props.onClick}/>
        </div>
    )
}

export default EditButton