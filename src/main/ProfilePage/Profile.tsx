import React, {useEffect} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {GetProfileDataTC, ProfileDataType} from "../../store/ProfileReducer";
import {StateType} from "../../store/redux-store";
import {Redirect} from 'react-router-dom';

type ProfileType = {}

const Profile = (props: ProfileType) => {

    const profileData = useSelector<StateType, ProfileDataType>(state => state.profile)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetProfileDataTC())
    }, [])

    return (
        <>
            {!profileData ? <Redirect to={'/login'}/> : null}
            <div className={s.profilePage}>
                <div className={s.profileContainer}>
                    <h1>profile</h1>
                </div>
            </div>
        </>
    )
}

export default Profile