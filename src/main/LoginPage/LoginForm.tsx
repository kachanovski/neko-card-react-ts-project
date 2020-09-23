import React from 'react';
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";

const LoginForm = React.memo(function (props: any) {
    return (
        <form className={props.className}>
            <Input />
            <Input />
            <Button />
        </form>
    )
})

export default LoginForm