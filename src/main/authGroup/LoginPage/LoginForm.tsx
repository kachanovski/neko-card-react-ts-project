import React from 'react';
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Checkbox from "../../../Components/Checkbox/Checkbox";

type LoginFormType = {
    className?: string
}

const LoginForm = (props: LoginFormType) => {
    return (
        <div className={props.className}>
            <Input label={'Login'}/>
            <Input type={'password'} label={'Password'}/>
            <Checkbox/>
            <Button title={'login'}/>
        </div>
    )
}

export default LoginForm