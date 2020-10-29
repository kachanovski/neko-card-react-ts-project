import React, {useEffect, useState} from "react";
import s from "./Card.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../store/redux-store";
import {CardsInitialStateType, getCards} from "../../../../store/profileReducers/CardsReducer";
import {ModalWindowCards} from "../ModalWindow/ModalWindowCards";
import Card from "./Card";
import AddButton from "../../../../Components/AddButton/AddButton";

type CardPropsType = {}

const Cards = (pack: CardPropsType) => {

    const card = useSelector<StateType, CardsInitialStateType>(state => state.cards)
    const [showModalWindowCard, setShowModalWindowCard] = useState(false)
    const dispatch = useDispatch()

    const onClickAddCard = () => {
        setShowModalWindowCard(true)
    }


    useEffect(() => {
        dispatch(getCards(window.location.href.split('/')[5]))
    }, [dispatch, card.cards.length])

    return (
        <div className={s.cardPage}>

            {showModalWindowCard
                ? <ModalWindowCards setShowModalWindowCard={setShowModalWindowCard}
                />
                : null}

            <div className={s.cardsContainer}>
                <div className={s.settingsField}>
                    <div>
                        question
                    </div>
                    <div>
                        type
                    </div>
                    <div>
                        answer
                    </div>
                    <div>
                        rating
                    </div>
                    <div style={{display: "flex"}}>
                       AddCard:
                        <AddButton onClick={onClickAddCard}/>
                    </div>
                </div>

                <div>
                    {card.cards.map(card => <Card key={card._id} {...card} /> )}
                </div>
            </div>
        </div>
    )


}
export default Cards