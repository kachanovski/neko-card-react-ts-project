import React, {useEffect, useState} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import Button from "../../Components/Button/Button";
import {AuthMe, setLogOutUser} from "../../store/LoginReducer";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import {addPacks, getPacks, PackType, showMyPacksTC} from '../../store/PacksReducer';
import Pack from "./Pack";


type ProfileType = {
    isFetching: boolean
}

type SearchInputForm = {
    searchName: string
    packName: string
    packType: string
}

const Profile = (props: ProfileType) => {
    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const pack = useSelector<StateType, Array<PackType>>(state => state.packs.packs)
    const userID = useSelector<StateType, string>(state => state.login._id)
    const dispatch = useDispatch()

    const [addMode, setAddMode] = useState<boolean>(false)

    const {register, handleSubmit, reset} = useForm<SearchInputForm>();
    const onSubmit = (data: SearchInputForm) => {
        dispatch(getPacks(data.searchName))
    }
    const addPackHandler = (data: SearchInputForm) => {
        dispatch(addPacks(data.packName, data.packType))
        reset()
    }
    const showMyPacks = () => {
        dispatch(showMyPacksTC(userID))
    }

    /* useEffect(() => {
         dispatch(GetProfileDataTC())
     }, [dispatch])*/

    useEffect(() => {
        !authMe && dispatch(AuthMe())
    }, [dispatch, authMe])

    /*    useEffect(() => {
                dispatch(getPacks())
        }, [dispatch])*/

    const logOut = () => {
        dispatch(setLogOutUser())
    }
    const addPackMode = () => {
        if (addMode) setAddMode(false)
        if (!addMode) setAddMode(true)
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
                        <input name="searchName" ref={register({required: false, maxLength: 20})}/>
                        <button type="submit">send</button>
                        {addMode
                        && <>
                            <input name="packName" ref={register({required: false, maxLength: 20})}
                                   placeholder="pack name"/>
                            <input name="packType" ref={register({required: false, maxLength: 20})}
                                   placeholder="type of pack"/>
                            <button onClick={handleSubmit(addPackHandler)}>add pack</button>
                        </>}
                    </form>

                    <button onClick={addPackMode}> +</button>
                    <button onClick={showMyPacks}> My packs</button>

                    {pack.map(pack => <Pack key={pack._id} {...pack}/>)}

                </div>

            </div>
        </>
    )
}

export default Profile