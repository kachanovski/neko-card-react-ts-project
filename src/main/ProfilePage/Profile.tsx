import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import Button from "../../Components/Button/Button";
import {AuthMe, InitialLoginReducerState, setLogOutUser} from "../../store/LoginReducer";
import {Redirect} from "react-router-dom";
import {getPacks, PackType, showMyPacksTC, sortPacksDown, sortPacksUp} from '../../store/PacksReducer';
import {ModalWindow} from './Packs/ModalWindow/ModalWindow';
import {Paginator} from "../../Components/Paginator/Paginator";
import SearchPacks from './Packs/Search/SearchPacks';
import Pack from "./Packs/Pack";


type ProfileType = {
    isFetching: boolean
}

const Profile = (props: ProfileType) => {
    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const profile = useSelector<StateType, InitialLoginReducerState>(state => state.login)
    const pack = useSelector<StateType, Array<PackType>>(state => state.packs.packs)
    const userID = useSelector<StateType, string>(state => state.login._id)
    const dispatch = useDispatch()

    const [showModalWindow, setShowModalWindow] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')

    const showMyPacks = () => {
        dispatch(showMyPacksTC(userID))
    }
    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const onClickSearch = () => {
        dispatch(getPacks(searchValue))
    }

    useEffect(() => {
        !authMe && dispatch(AuthMe())
    }, [dispatch, authMe])

    useEffect(() => {
        dispatch(getPacks(''))
    }, [dispatch])

    const logOut = () => {
        dispatch(setLogOutUser())
    }
    const addPackMode = () => {
        setShowModalWindow(true)
    }

    if (!authMe) return <Redirect to={'/login'}/>


    return (

        <div className={s.profilePage}>

            {showModalWindow
                ? <ModalWindow setShowModalWindow={setShowModalWindow}
                />
                : null}


            <div className={s.profilePage}>
                <div className={s.profileContainer}>
                    <div className={s.titleProfile}>Profile</div>
                    <div>
                        <div>{profile.avatar}</div>
                        <div>{profile.name}</div>
                    </div>
                    <Button onClick={logOut} title={'LogOut'}/>
                </div>

                <div className={s.profileContent}>

                    <SearchPacks onChangeSearchInput={onChangeSearchInput}
                                 onClickSearch={onClickSearch}
                                 searchValue={searchValue}
                    />

                    <div className={s.packsContainer}>
                        <div>
                            Name
                            <button onClick={() => dispatch(sortPacksUp())}>up</button>
                            <button onClick={() => dispatch(sortPacksDown())}>down</button>
                        </div>
                        <div>
                            Cards
                        </div>
                        <div>
                            type
                        </div>
                        <div>
                            Update
                            <button>up</button>
                            <button>down</button>
                        </div>
                        <div>Rating</div>
                        <div>email/user_name</div>
                        <div>
                            <button onClick={addPackMode}> Add Pack</button>
                            <button onClick={showMyPacks}> My packs</button>
                        </div>
                    </div>

                    <div>
                        {pack.map(pack => <Pack key={pack._id} {...pack}/>)}
                    </div>
                    <Paginator/>
                </div>
            </div>
        </div>

    )
}

export default Profile
