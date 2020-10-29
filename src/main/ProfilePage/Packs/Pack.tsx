import React, {useState} from "react";
import {deletePack, editPack, PackType} from "../../../store/profileReducers/PacksReducer";
import s from "../Profile.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {getCards} from "../../../store/profileReducers/CardsReducer";
import {NavLink} from "react-router-dom";
import {StateType} from "../../../store/redux-store";
import DeleteButton from "../../../Components/Delete/DeleteButton";
import EditButton from "../../../Components/EditButton/EditButton";

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
    const searchName = useSelector<StateType, string>(state => state.packs.searchName)


    const deletePackHandler = () => {
        dispatch(deletePack(pack._id,searchName))
    }
    const editPackMode = () => {
        if (editMode) setEditMode(false)
        if (!editMode) setEditMode(true)
    }
    const saveChanges = (data: EditInput) => {
        dispatch(editPack(pack._id, {name: data.packName, type: data.packType},searchName))
        setEditMode(true)
    }

    const onClickCard = () => {
        dispatch(getCards(pack._id))
    }

    return (
        <div className={s.cardField}>
            {editMode
                ? <div>
                    <span>
                        <NavLink to={`/cards/${pack._id}`} className={s.packLink} onClick={onClickCard}>
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
            <div style={{display: 'flex'}}>
                <EditButton onClick={editPackMode} />
                <DeleteButton onClick={deletePackHandler} />
            </div>
        </div>
    )
}
export default Pack