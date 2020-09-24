import React from 'react';
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import {NavLink} from 'react-router-dom';

const LoginForm = React.memo(function (props: any) {
    return (
        <div className={props.className}>
            <Input label={'Login'}/>
            <Input label={'Password'}/>
            <NavLink to={'/profile'}>
                <Button title={'login'}/>
            </NavLink>
        </div>
    )
})

export default LoginForm