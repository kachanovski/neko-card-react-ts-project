import React, {useCallback, useState} from "react";
import s from "./Card.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {CardType, deleteCard, updateCard} from "../../../../store/profileReducers/CardsReducer";
import {useForm} from "react-hook-form";
import EditButton from "../../../../Components/EditButton/EditButton";
import DeleteButton from "../../../../Components/Delete/DeleteButton";
import {StateType} from "../../../../store/redux-store";

type CardPropsType = CardType & { packId: string }

type EditInputCards = {
    question: string
    type: string
    answer: string
}

const Card = React.memo((props: CardPropsType) => {

        const [editMode, setEditMode] = useState<boolean>(false)
        const dispatch = useDispatch()
        const {register, handleSubmit} = useForm<EditInputCards>();
        const userID = useSelector<StateType, string>(state => state.login._id)

        const editPackMode = () => {
            if (editMode) setEditMode(false)
            if (!editMode) setEditMode(true)
        }

        const onClickDeleteCard = useCallback(() => {
            dispatch(deleteCard(props, props.packId))
        }, [dispatch, props])

        const saveChanges = useCallback((data: EditInputCards) => {
            dispatch(updateCard(props._id, {
                question: data.question,
                type: data.type
            }, props.packId))
            setEditMode(false)
        }, [dispatch, props._id, props.packId])


        return (
            <div className={s.cardsField}>
                {editMode
                    ? <form onSubmit={handleSubmit(saveChanges)}>
                        <input name="question" ref={register({maxLength: 20})}
                               defaultValue={props.question}/>
                        <input name="type" ref={register({maxLength: 20})}
                               defaultValue={props.type}/>
                        <button type="submit">save</button>
                    </form>
                    : <div>
                        {props.question}
                    </div>
                }

                <div>
                    {props.type}
                </div>
                <div>
                    {props.answer}
                </div>

                <div>
                    {props.rating}
                </div>

                {userID === props.user_id && <div style={{display: 'flex'}}>
                    <EditButton onClick={editPackMode}/>
                    <DeleteButton onClick={onClickDeleteCard}/>
                </div>}

            </div>
        )
    }
)
export default Card