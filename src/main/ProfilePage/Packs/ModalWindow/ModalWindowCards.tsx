import React, {useState} from "react";
import s from './ModalWindow.module.scss'
import Input from "../../../../Components/Input/Input";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addCard} from "../../../../store/profileReducers/CardsReducer";

type ModalWindowPropsType = {
    setShowModalWindowCard: (showModalWindowCard: boolean) => void
}

type SearchInputForm = {
    question: string
    answer: string
    cardType: string
}

export const ModalWindowCards = (props: ModalWindowPropsType) => {

    const dispatch = useDispatch()
    const {handleSubmit, control, reset} = useForm<SearchInputForm>();
    const [packId] = useState(window.location.href.split('/')[5])

    const onSubmit = (data: SearchInputForm) => {

        const newCard = {
            cardsPack_id: packId,
            question: data.question,
            answer: data.answer,
            type: data.cardType,
        }
        dispatch(addCard(newCard, packId))
        reset()
        props.setShowModalWindowCard(false)
    }

    return (
        <div className={s.modalWindowContainer}>
            <div className={s.modalWindow}>
                <h3>Add card</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        as={<Input
                            label={'Question'}/>}
                        name="question"
                        control={control}
                        defaultValue=""
                    />
                    <Controller as={<Input
                        label={'Answer'}/>}
                                name="answer"
                                control={control}
                                defaultValue=""
                    />
                    <Controller as={<Input
                        label={'Cards Type'}/>}
                                name="cardType"
                                control={control}
                                defaultValue=""
                    />
                    <button type={'submit'}>SEND</button>
                </form>
                <button onClick={() => props.setShowModalWindowCard(false)}>CLOSE</button>
            </div>
        </div>
    )
}

