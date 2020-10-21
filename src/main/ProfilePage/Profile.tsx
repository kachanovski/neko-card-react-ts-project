import React, {useEffect} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {GetProfileDataTC} from "../../store/ProfileReducer";
import {StateType} from "../../store/redux-store";
import Button from "../../Components/Button/Button";
import {AuthMe, setLogOutUser} from "../../store/LoginReducer";
import {Redirect} from "react-router-dom";

type ProfileType = {
    isFetching: boolean
}

const Profile = (props: ProfileType) => {

    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetProfileDataTC())
    }, [dispatch])


    useEffect(() => {
        dispatch(AuthMe())
    }, [dispatch, authMe])

    const logOut = () => {
        dispatch(setLogOutUser())
    }

    if (!authMe) return <Redirect to={'/login'}/>

    console.log('profile')

    return (
        <>
            <div className={s.profilePage}>
                <div className={s.profileContainer}>
                    <div className={s.titleProfile}>Profile</div>
                    <div>
                        <div>Ava</div>
                        <div>Ava</div>
                        <div>name</div>
                    </div>
                    <Button onClick={logOut} title={'LogOut'}/>
                </div>
                <div className={s.profileContent}>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                    <div className={s.cardField}></div>
                </div>

            </div>
        </>
    )
}

export default Profile