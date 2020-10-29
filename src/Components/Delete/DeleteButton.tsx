import React from "react";
import deleteButton from '../../accets/images/delete_icon.png'
import s from "./DeleteButton.module.scss";

type DeleteButtonProps = {
   onClick?: () => void
}

const DeleteButton = (props: DeleteButtonProps) => {
    return (
        <div className={s.deleteButton}>
            <img alt={'delete'} src={deleteButton} onClick={props.onClick}/>
        </div>
    )
}

export default DeleteButton