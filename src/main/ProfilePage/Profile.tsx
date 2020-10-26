import React, {useEffect} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import Button from "../../Components/Button/Button";
import {AuthMe, setLogOutUser} from "../../store/LoginReducer";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getPacks, PackType} from '../../store/PacksReducer';


type ProfileType = {
    isFetching: boolean
}

type SearchInputForm = {
    searchName: string
}

const Profile = (props: ProfileType) => {
    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const pack = useSelector<StateType, Array<PackType>>( state => state.packs.packs)
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm<SearchInputForm>();
    const onSubmit = (data: SearchInputForm) => {
       dispatch(getPacks(data.searchName))
    };

   /* useEffect(() => {
        dispatch(GetProfileDataTC())
    }, [dispatch])*/

    useEffect(() => {
        dispatch(AuthMe())
    }, [dispatch, authMe])

/*    useEffect(() => {
            dispatch(getPacks())
    }, [dispatch])*/

    const logOut = () => {
        dispatch(setLogOutUser())
    }
    if (!authMe) return <Redirect to={'/login'}/>


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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="searchName" ref={register({required: true, maxLength: 20})}/>
                        <button type="submit">send</button>
                    </form>

                    {pack.map(pack => <div className={s.cardField}> {pack.name} </div>)}

                </div>

            </div>
        </>
    )
}

export default Profile