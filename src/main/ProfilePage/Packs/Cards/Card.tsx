import React, {useEffect, useState} from "react";
import s from "./Card.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../store/redux-store";
import {CardsInitialStateType, CardType, deleteCard, getCards, updateCard} from "../../../../store/CardsReducer";
import {useForm} from "react-hook-form";

type CardPropsType = CardType

type EditInputCards = {
    question: string
    type: string
    answer: string
}

const Card = (props: CardPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const card = useSelector<StateType, CardsInitialStateType>(state => state.cards)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm<EditInputCards>();
    const [packId] = useState(window.location.href.split('/')[5])

    useEffect(() => {
        dispatch(getCards(window.location.href.split('/')[5]))
    }, [dispatch, card.cards.length])

    const editPackMode = () => {
        if (editMode) setEditMode(false)
        if (!editMode) setEditMode(true)
    }
    const saveChanges = (data: EditInputCards) => {
        dispatch(updateCard(props._id, {
            question: data.question,
            type: data.type
        }, packId))
        console.log(data)
        setEditMode(false)

    }
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
                        <div>
                            {props.question}
                        </div>
                        <div>
                            {props.type}
                        </div>
                        <div>
                            {props.answer}
                        </div>
                    </div>
                }

                <div>
                    <div>
                        {props.question}
                    </div>
                    <div>
                        {props.type}
                    </div>
                    <div>
                        {props.answer}
                    </div>
                </div>

                <div>
                    {props.rating}
                </div>
                <div>
                    <button onClick={() => {
                        dispatch(deleteCard(props, packId))
                    }}>delete
                    </button>
                    <button onClick={editPackMode}>update
                    </button>
                </div>
            </div>
        )
}
export default Card