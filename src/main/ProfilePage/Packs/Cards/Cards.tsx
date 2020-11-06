import React, {useCallback, useEffect, useState} from "react";
import s from "./Card.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../store/redux-store";
import {CardsInitialStateType, getCards} from "../../../../store/profileReducers/CardsReducer";
import {ModalWindowCards} from "../ModalWindow/ModalWindowCards";
import Card from "./Card";
import AddButton from "../../../../Components/AddButton/AddButton";
import {useParams, useHistory} from "react-router-dom";
import Button from "../../../../Components/Button/Button";

type CardPropsType = {}

const Cards = React.memo((pack: CardPropsType) => {

        const card = useSelector<StateType, CardsInitialStateType>(state => state.cards)
        const [showModalWindowCard, setShowModalWindowCard] = useState(false)
        const dispatch = useDispatch()
        const {packId} = useParams()
        const history = useHistory()

        useEffect(() => {
            dispatch(getCards(packId))
        }, [dispatch, packId])

        const onClickAddCard = useCallback(function () {
            setShowModalWindowCard(true)
        }, [setShowModalWindowCard])

        const packButton = () => {
            history.push('/profile')
        }

        return (
            <div className={s.cardPage}>

                {showModalWindowCard
                    ? <ModalWindowCards setShowModalWindowCard={setShowModalWindowCard}
                    />
                    : null}

                <div className={s.cardsContainer}>
                    <Button title={'Back'} onClick={packButton}/>
                    <div className={s.settingsField}>
                        <div>
                            question
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
                        {card.cards.map(card => <Card packId={packId} key={card._id} {...card} />)}
                    </div>
                </div>
            </div>
        )
    }
)
export default Cards