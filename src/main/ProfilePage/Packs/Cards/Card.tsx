import React from "react";
import s from "./Card.module.scss";
import {useSelector} from "react-redux";
import {StateType} from "../../../../store/redux-store";
import {CardsInitialStateType} from "../../../../store/CardsReducer";

type CardPropsType = {}

const Card = (pack: CardPropsType) => {

    const card = useSelector<StateType, CardsInitialStateType>(state => state.cards)

    return (
        <div className={s.cardPage}>
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
                    <div>
                        Rating
                    </div>
                </div>

                <div>
                    {card.cards.map(card => {
                        return (
                            <div key={card.cardsPack_id} className={s.cardsField}>
                                <div>
                                    {card.question}
                                </div>
                                <div>
                                    {card.type}
                                </div>
                                <div>
                                    {card.answer}
                                </div>
                                <div>
                                    {card.rating}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )


}
export default Card