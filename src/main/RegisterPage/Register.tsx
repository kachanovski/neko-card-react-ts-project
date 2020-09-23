import React from 'react';
import s from './Register.module.scss'
import Input from "../../Components/Input/Input";

const Register = () => {
    return (
        <div className={s.registerPage}>
           <div className={s.registerBox}>
               <h1>REGISTER</h1>
               <Input />
               <Input />
               <Input />
               <Input />
               <Input />
               <Input />
               <Input />
               <Input />
               <Input />
           </div>
        </div>
    )
}

export default Register