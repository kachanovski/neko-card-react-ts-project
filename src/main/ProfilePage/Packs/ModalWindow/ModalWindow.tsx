import React from "react";
import s from './ModalWindow.module.scss'
import Input from "../../../../Components/Input/Input";
import {Controller, useForm} from "react-hook-form";
import {addPacks} from "../../../../store/PacksReducer";
import {useDispatch} from "react-redux";

type ModalWindowPropsType = {
    setShowModalWindow: (showModalWindow: boolean) => void
}

type SearchInputForm = {
    packName: string
    packType: string
}

export const ModalWindow = (props: ModalWindowPropsType) => {
    const dispatch = useDispatch()
    const {handleSubmit, control, reset} = useForm<SearchInputForm>();

    const onSubmit = (data: SearchInputForm) => {
        dispatch(addPacks(data.packName, data.packType))
        reset()
        props.setShowModalWindow(false)
    }

    return (
        <div className={s.modalWindowContainer}>
            <div className={s.modalWindow}>
                <h3>Add card</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        as={<Input
                            label={'Pack Name'}/>}
                        name="packName"
                        control={control}
                        defaultValue=""
                    />
                    <Controller as={<Input
                        label={'Pack Type'}/>}
                                name="packType"
                                control={control}
                                defaultValue=""
                    />
                    <button type={'submit'}>SEND</button>
                </form>
                <button onClick={() => props.setShowModalWindow(false)}>CLOSE</button>
            </div>
        </div>
    )
}

