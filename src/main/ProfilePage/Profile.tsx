import React, {useEffect} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {GetProfileDataTC, ProfileDataType} from "../../store/ProfileReducer";
import {StateType} from "../../store/redux-store";
import {Redirect} from 'react-router-dom';
import Preloader from "../../Components/Preloader/Preloader";
import Button from "../../Components/Button/Button";

type ProfileType = {}

const Profile = (props: ProfileType) => {

    const profileData = useSelector<StateType, ProfileDataType>(state => state.profile)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetProfileDataTC)
    }, [])

  /*  if (!profileData?._id) return <Redirect to={'/login'}/>
*/


    return (
        <>
            <div className={s.profilePage}>
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

                <div className={s.profileContainer}>
                    <div className={s.titleProfile}>Profile </div>
                    <div>Ava</div>
                    <div>Ava</div>
                    <div>name</div>
                    <Button title={'LogOut'} />
                </div>
            </div>
        </>
    )
}

export default Profile