import React from 'react';
import s from './Register.module.scss'
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";

type RegisterProps = {

}

const Register = (props: RegisterProps) => {
    return (
        <div className={s.registerPage}>
            <div className={s.registerBox}>
                <h1>REGISTER</h1>
                <Input label={'Enter your login'}/>
                <Input label={'Enter your login'}/>
                <Input label={'Enter your login'}/>
                <Input label={'Enter your login'}/>
                <Input label={'Enter your login'}/>
                <Input label={'Enter your login'}/>
                <Input label={'Enter your login'}/>
                <Input label={'Enter your login'}/>
                <Input label={'Enter your login'}/>
                <Button title={"SEND"}/>
            </div>
        </div>
    )
}

export default Register