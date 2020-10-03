import React from 'react';
import s from './Profile.module.scss'

type ProfileType = {

}

const Profile = (props: ProfileType) => {
    return (
        <div className={s.profilePage}>
            <div className={s.profileContainer}>
                <h1>profile</h1>
            </div>
        </div>
    )
}

export default Profile