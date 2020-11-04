import React, {useCallback, useState} from "react";
import s from "./Card.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {CardType, deleteCard, updateCard} from "../../../../store/profileReducers/CardsReducer";
import {useForm} from "react-hook-form";
import EditButton from "../../../../Components/EditButton/EditButton";
import DeleteButton from "../../../../Components/Delete/DeleteButton";
import {StateType} from "../../../../store/redux-store";
import {ModalWindowDelete} from "../ModalWindow/ModalWindowDelete";

type CardPropsType = CardType & { packId: string }

type EditInputCards = {
    question: string
    answer: string
}

const Card = React.memo((props: CardPropsType) => {

        const [editMode, setEditMode] = useState<boolean>(false)
        const dispatch = useDispatch()
        const {register, handleSubmit, getValues} = useForm<EditInputCards>();
        const userID = useSelector<StateType, string>(state => state.login._id)
        const [showModalWindowDelete, setShowModalWindowDelete] = useState<boolean>(false)

        const editPackMode = () => {
            if (editMode) setEditMode(false)
            if (!editMode) setEditMode(true)
        }

        const deleteCardHandler = useCallback(() => {
            dispatch(deleteCard(props, props.packId))
            setShowModalWindowDelete(false)
        }, [dispatch, props])

        const saveChanges = useCallback((data: EditInputCards) => {
            dispatch(updateCard( {
                _id: props._id,
                question: data.question,
                answer: data.answer
            }, props.packId))
            setEditMode(false)
        }, [dispatch, props._id, props.packId, getValues().question, getValues().answer])


        return (
            <div className={s.cardsField}>

                {showModalWindowDelete
                    ? <ModalWindowDelete onClick={deleteCardHandler}
                                         setShowModalWindowDelete={setShowModalWindowDelete}
                    />
                    : null}

                {editMode
                    ? <form onSubmit={handleSubmit(saveChanges)}>
                        <input name="question" ref={register({maxLength: 20})}
                               defaultValue={props.question}/>
                        <input name="answer" ref={register({maxLength: 20})}
                               defaultValue={props.type}/>
                        <button type="submit">save</button>
                    </form>
                    : <div>
                        {props.question}
                    </div>
                }
                <div>
                    {props.answer}
                </div>

                <div>
                    {props.rating}
                </div>

                {userID === props.user_id && <div style={{display: 'flex'}}>
                    <EditButton onClick={editPackMode}/>
                    <DeleteButton onClick={() => setShowModalWindowDelete(true)}/>
                </div>}

            </div>
        )
    }
)
export default Card