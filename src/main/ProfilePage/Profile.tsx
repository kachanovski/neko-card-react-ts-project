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

    // возвращает куки с указанным name,
    // или undefined, если ничего не найдено
    const getCookie = (name: string) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    useEffect(() => {
        if (profileData) {
           if (getCookie(profileData.name)){return}
        }
        dispatch(GetProfileDataTC())
    }, [])

    // const onClick = () => {
    //     alert(document.cookie)
    // }

    return (
        <>
            {!profileData ? <Redirect to={'/login'}/> : null}
            <div className={s.profilePage}>
                <div className={s.profileContainer}>
                    <h1>profile</h1>
                    {/*<button onClick={onClick}>покажи куки</button>*/}
                </div>
            </div>
        </>
    )
}

export default Profile