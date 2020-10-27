import React, {useState} from "react";
import {deletePack, editPack, PackType} from "../../../store/PacksReducer";
import s from "../Profile.module.scss";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {getCards} from "../../../store/CardsReducer";
import {NavLink} from "react-router-dom";

type PackPropsType = PackType
type EditInput = {
    packName: string
    userName: string
    packType: string
}

const Pack = (pack: PackPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(true)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm<EditInput>();

    const deletePackHandler = () => {
        dispatch(deletePack(pack._id))
    }
    const editPackMode = () => {
        if (editMode) setEditMode(false)
        if (!editMode) setEditMode(true)
    }
    const saveChanges = (data: EditInput) => {
        dispatch(editPack(pack._id, {name: data.packName, type: data.packType}))
        setEditMode(true)
    }

    const goToCards = () => {
        dispatch(getCards(pack._id))
    }

    return (
        <div className={s.cardField}>
            {editMode
                ? <div>
                    <span>
                        <NavLink to={`/cards/${pack._id}`} className={s.packLink} onClick={goToCards}>
                            {pack.name}
                        </NavLink>
                </span>
                </div>
                : <div>
                    <form onSubmit={handleSubmit(saveChanges)}>
                        <input name="packName" ref={register({maxLength: 20})} defaultValue={pack.name}/>
                        <input name="packType" ref={register({maxLength: 20})} defaultValue={pack.type}/>
                        <button type="submit">save</button>
                    </form>
                </div>
            }
            <div>
                {pack.cardsCount}
            </div>
            <div>
                {pack.type}
            </div>
            <div>
                {pack.updated}
            </div>
            <div>
                {pack.rating}
            </div>
            <span>{pack.user_name}</span>
            <div>
                <button onClick={deletePackHandler}>delete</button>
                <button onClick={editPackMode}>edit</button>
            </div>
        </div>
    )
}
export default Pack