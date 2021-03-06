import React, {useEffect, useState} from "react";
import {CardType, getCards, setGrade} from "../../../store/profileReducers/CardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../store/redux-store";
import {useParams, useHistory} from "react-router-dom";
import Button from "../../../Components/Button/Button";
import s from "../TutorialPage/TutorialPage.module.scss"


const grades = [
    {value: 'не знал', grade: 1}, {value: 'забыл', grade: 2}, {value: 'долго думал', grade: 3},
    {value: 'перепутал', grade: 4}, {value: 'знал', grade: 5}
]
// рандом карточек
const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - (card.grade ? card.grade : 0)) * (6 - (card.grade ? card.grade : 0)), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - (card.grade ? card.grade : 0)) * (6 - (card.grade ? card.grade : 0));
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1})

    return cards[res.id + 1];
}

const TutorialPage = () => {

    const cards = useSelector<StateType, Array<CardType>>(state => state.cards.cards)
    const dispatch = useDispatch()
    const {packId} = useParams()
    const history = useHistory()
    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        question: 'q u e s t i o n',
        answer: ' a n s v e r',
        grade: 0,
        answerImg: '',
        answerVideo: '',
        cardsPack_id: '',
        comments: '',
        questionImg: '',
        questionVideo: '',
        rating: 0,
        shots: 0,
        type: '',
        user_id: ''
    })
    const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getCards(packId))

    }, [dispatch, packId])
    useEffect( () => {
        if (cards.length > 0) setCard(getCard(cards))
    },[cards])

    const packButton = () => {
        history.push('/profile')
    }
    const showAnswer = () => {
        setIsShowAnswer(true)
    }
    const setCards = () => {
        setCard(getCard(cards))
        setIsShowAnswer(false)
    }

    return (
        <div className={s.tutorialPage}>
            <Button title={'Back'} onClick={packButton}/>
            <p>Learn</p>
            <div className={s.cardQuestion}>
                Question: {card.question}
                <div>
                    <Button title={'Check answer'} onClick={showAnswer}/>
                    {isShowAnswer && <span>Answer: {card.answer}</span>}
                </div>
                <div className={s.tutorialButtonsContainer}>
                    {grades.map((g, i) => {
                        const checkGrade = () => {
                            if (card._id) {
                                dispatch(setGrade(g.grade, card._id))
                                setCard(getCard(cards))
                                setIsShowAnswer(false)
                            }
                        }
                        return <Button key={i} title={g.value} onClick={checkGrade}/>
                    })}
                    <Button onClick={setCards} title={'next'}/>
                </div>
            </div>
        </div>
    )
}

export default TutorialPage;