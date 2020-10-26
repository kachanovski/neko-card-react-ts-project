import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import Button from "../../Components/Button/Button";
import {AuthMe, setLogOutUser, InitialLoginReducerState} from "../../store/LoginReducer";
import {Redirect} from "react-router-dom";
import {getPacks, PackType, sortPacksUp, sortPacksDown} from '../../store/PacksReducer';
import Input from "../../Components/Input/Input";
import { ModalWindow } from './ModalWindow/ModalWindow';


type ProfileType = {
    isFetching: boolean
}


const Profile = (props: ProfileType) => {
    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const profile = useSelector<StateType, InitialLoginReducerState>(state => state.login)
    const pack = useSelector<StateType, Array<PackType>>(state => state.packs.packs)
    const dispatch = useDispatch()

    const [showModalWindow, setShowModalWindow] = useState(false)

    const [searchValue, setSearchValue] = useState('')

    const onChangeSearchInput = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const onClickSearch = () => {
        dispatch(getPacks(searchValue))
    }

    useEffect(() => {
        dispatch(AuthMe())
    }, [dispatch, authMe])

    useEffect(() => {
        dispatch(getPacks(''))
    }, [dispatch])

    const logOut = () => {
        dispatch(setLogOutUser())
    }
    if (!authMe) return <Redirect to={'/login'}/>


    return (

            <div className={s.profilePage} >

                {showModalWindow ? <ModalWindow setShowModalWindow={setShowModalWindow} /> : null}


                <div className={s.profileContainer}>
                    <div className={s.titleProfile}>Profile</div>
                    <div>
                        <div>{profile.avatar}</div>
                        <div>{profile.name}</div>
                    </div>
                    <button onClick={() => setShowModalWindow(true)}>++++</button>
                    <Button onClick={logOut} title={'LogOut'}/>
                </div>

                <div className={s.profileContent}>
                    <div className={s.searchField}>
                        <Input onChange={onChangeSearchInput} label={'Search'}  type={'text'} value={searchValue} />
                        <Button onClick={onClickSearch} title={"Search"} />
                    </div>

                        <div className={s.packsContainer}>
                            <div>
                                Name
                                <button onClick={() => dispatch(sortPacksUp())}>up</button>
                                <button onClick={() => dispatch(sortPacksDown())}>down</button>
                            </div>
                            <div>
                                Update
                                <button>up</button>
                                <button>down</button>
                            </div>
                            <div>Rating</div>
                            <div>oper</div>

                        </div>
                        <div>
                            {pack.map(pack => <div id={pack._id} className={s.cardField}>
                                {pack.name}
                                <div>
                                    {pack.created}
                                </div>
                                <div>
                                    {pack.rating}
                                </div>
                                <div>
                                    <button>delete</button>
                                    <button>update</button>
                                </div>
                            </div>)}
                        </div>


                </div>

            </div>
)
}

export default Profile


const Pack = () => {
    return (
    <div className={s.cardField}>

    </div>
    )
}