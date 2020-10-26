import React, {useState} from "react";
import {deletePack, editPack, PackType} from "../../store/PacksReducer";
import s from "./Profile.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

type PackPropsType = PackType
type EditInput = {
    packName: string
    userName: string
    packType: string
}

const Pack = (pack: PackPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(true)
    const dispatch = useDispatch()
    const {register, handleSubmit, reset} = useForm<EditInput>();

    const deletePackHandler = () => {
        dispatch(deletePack(pack._id))
    }
    const editPackMode = () => {
        if (editMode) setEditMode(false)
        if (!editMode) setEditMode(true)
    }
    const saveChanges = (data: EditInput) => {
        dispatch(editPack(pack._id,{name: data.packName, type: data.packType}))
        setEditMode(true)
    }

    return (
        <div className={s.cardField}>
            {editMode
                ? <div><span>name: {pack.name} - type: {pack.type}</span></div>
                : <div>
                    <form onSubmit={handleSubmit(saveChanges)}>
                        <input name="packName" ref={register({maxLength: 20})} defaultValue={pack.name}/>
                        <input name="packType" ref={register({maxLength: 20})} defaultValue={pack.type}/>
                        <button type="submit">save</button>
                    </form>
                </div>
            }
            <div>
                <button onClick={deletePackHandler}>delete</button>
                <button onClick={editPackMode}>edit</button>
            </div>
            <span>email/user_name:{pack.user_name}</span>
        </div>
    )
}
export default Pack