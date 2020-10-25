import React, {useEffect} from 'react'
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import s from "./Register.module.scss";
import Button from "../../../Components/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {initialStateType, RegisterUserTC, SetErrorRegisterAC} from "../../../store/RegisterReducer";
import {StateType} from "../../../store/redux-store";
import {Redirect} from "react-router-dom";
import Input from "../../../Components/Input/Input";

type RegisterPropsType = {
    isFetching: boolean
}

type FormsType = {
    "confirm_password": string
    "password": string
    "email": string
}
export const schema = yup.object().shape({
    password: yup.string().required().min(7),
    email: yup.string().required().email(),
    confirm_password: yup.string().required().min(7)
});

const Register = React.memo((props: RegisterPropsType) => {

    const dispatch = useDispatch()

    const newUserData = useSelector<StateType, initialStateType>(state => state.register)



    const {handleSubmit, errors, reset, setError, control} = useForm<FormsType>(
        {
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = (data: FormsType) => {
        if (data.confirm_password === data.password) {
            let newData = {
                email: data.email,
                password: data.password
            }
            dispatch(RegisterUserTC(newData))
            reset()
        } else {
            setError('password', {message: 'Пароли не совпадают'})
            setError('confirm_password', {message: 'Пароли не совпадают'})
        }
    }

    useEffect(() => {
        dispatch(SetErrorRegisterAC(''))
    },[dispatch])

    const onBlur = () => {
        dispatch(SetErrorRegisterAC(''))
        // clearErrors('password')
        // clearErrors('confirm_password')
        // clearErrors('email')
    }

    return (
        <>
            {newUserData.data.email.length > 0 && <Redirect to={'/login'}/>}
            <div className={s.registerPage} onBlur={onBlur}>
                <div className={s.registerBox}>
                    <h1>REGISTER</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Controller
                            as={<Input onChange={() => errors.email?.message === null}
                                       error={errors.email?.message || newUserData.errorMessage}
                                       type={'text'}
                                       label={'Enter your login'}/>}
                            name="email"
                            control={control}
                            defaultValue=""
                        />
                        <div className={s.errorMessageColor}>
                            {errors.email?.message || newUserData.errorMessage}
                        </div>

                        <Controller
                            as={<Input
                                error={errors.password?.message}
                                type={'password'}
                                label={'password'}/>}
                            name="password"
                            control={control}
                            defaultValue=""
                        />
                        <div className={s.errorMessageColor}>
                            {errors.password?.message}
                        </div>

                        <Controller
                            as={<Input onChange={() => errors.confirm_password?.message === null}
                                       error={errors.confirm_password?.message}
                                       type={'password'}
                                       label={'confirm password'}/>}
                            name="confirm_password"
                            control={control}
                            defaultValue=""
                        />
                        <div className={s.errorMessageColor}>
                            {errors.confirm_password?.message}
                        </div>

                        <Button title={"SEND"}
                                disable={props.isFetching}/>
                    </form>
                </div>
            </div>
        </>
    )
})

export default Register
