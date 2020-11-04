import React, {useCallback, useState} from "react";
import {deletePack, editPack, PackType} from "../../../store/profileReducers/PacksReducer";
import s from "../Profile.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {getCards} from "../../../store/profileReducers/CardsReducer";
import {NavLink} from "react-router-dom";
import {StateType} from "../../../store/redux-store";
import DeleteButton from "../../../Components/Delete/DeleteButton";
import EditButton from "../../../Components/EditButton/EditButton";
import {ModalWindow} from "./ModalWindow/ModalWindow";
import {ModalWindowDelete} from "./ModalWindow/ModalWindowDelete";

type PackPropsType = PackType
type EditInput = {
    packName: string
    userName: string
}

const Pack = React.memo((pack: PackPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(true)
    const dispatch = useDispatch()
    const {register, handleSubmit, getValues} = useForm<EditInput>();
    const searchName = useSelector<StateType, string>(state => state.packs.searchName)
    const userID = useSelector<StateType, string>(state => state.login._id)
    const [showModalWindowDelete, setShowModalWindowDelete] = useState<boolean>(false)


    const deletePackHandler = useCallback(() => {
        dispatch(deletePack(pack._id, searchName))
    }, [pack._id, searchName])

    const editPackMode = useCallback(() => {
        if (editMode) setEditMode(false)
        if (!editMode) setEditMode(true)
    }, [editMode])

    const saveChanges = useCallback((data: EditInput) => {
        dispatch(editPack(pack._id, {name: data.packName}, searchName))
        setEditMode(true)
    }, [pack._id, searchName, getValues().packName])

    const onClickCard = useCallback(() => {
        dispatch(getCards(pack._id))
    }, [pack._id])

    return (
        <div className={s.cardField}>

            {showModalWindowDelete
                ? <ModalWindowDelete onClick={deletePackHandler}
                                     setShowModalWindowDelete={setShowModalWindowDelete}
                />
                : null}

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
                        <button type="submit">save</button>
                    </form>
                </div>
            }
            <div>
                {pack.cardsCount}
            </div>
            <div>
                {pack.updated}
            </div>
            <span>{pack.user_name}</span>

            {pack.cardsCount !== 0 && <div>
                        <span>
                            <NavLink to={`/learn/${pack._id}`} className={s.packLink} onClick={onClickCard}>
                                learn
                            </NavLink>
                        </span>
            </div>}

            {userID === pack.user_id && <div style={{display: 'flex'}}>
                <EditButton onClick={editPackMode}/>
                <DeleteButton onClick={() => setShowModalWindowDelete(true)}/>
            </div>}

        </div>
    )
})

export default Pack