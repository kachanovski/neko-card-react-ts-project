import React, {ChangeEvent, useState} from 'react';
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Checkbox from "../../../Components/Checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {setLogin} from "../../../store/LoginReducer";
import {StateType} from "../../../store/redux-store";

type LoginFormType = {
    className?: string
}

const LoginForm = (props: LoginFormType) => {

    const dispatch = useDispatch()
    const error = useSelector<StateType, string>(state => state.login.error)

    let [loginValue, setLoginValue] = useState('')
    let [passValue, setPassValue] = useState('')
    let [checked, setChecked] = useState(false)

    const onChangeLoginValue = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginValue(e.currentTarget.value)
    }
    const onChangePassValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPassValue(e.currentTarget.value)
    }
    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.checked)
    }
    const onSubmit = () => {
        dispatch(setLogin(loginValue, passValue, checked))
    }

    return (
        <div className={props.className}>
            <Input label={'Login'} value={loginValue} onChange={onChangeLoginValue} error={error}/>
            <Input type={'password'} label={'Password'} value={passValue} onChange={onChangePassValue} error={error}/>
            <Checkbox checked={checked} onChange={onChangeChecked}/>
            <Button title={'login'} onClick={onSubmit}/>
        </div>
    )
}

export default LoginForm