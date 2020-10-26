import React, {useEffect, useState, ChangeEvent} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import Button from "../../Components/Button/Button";
import {AuthMe, setLogOutUser, InitialLoginReducerState} from "../../store/LoginReducer";
import {Redirect} from "react-router-dom";
import { sortPacksUp, sortPacksDown} from '../../store/PacksReducer';
import Input from "../../Components/Input/Input";
import {ModalWindow} from './ModalWindow/ModalWindow';
import {Paginator} from "../../Components/Paginator/Paginator";
import {useForm} from "react-hook-form";
import {addPacks, getPacks, PackType, showMyPacksTC} from '../../store/PacksReducer';



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
    const profile = useSelector<StateType, InitialLoginReducerState>(state => state.login)
    const pack = useSelector<StateType, Array<PackType>>(state => state.packs.packs)
    const userID = useSelector<StateType, string>(state => state.login._id)
    const dispatch = useDispatch()

    const [showModalWindow, setShowModalWindow] = useState(false)

    const [searchValue, setSearchValue] = useState('')
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
        if (addMode) setAddMode(false)
        if (!addMode) setAddMode(true)
    }
    if (!authMe) return <Redirect to={'/login'}/>


    return (

        <div className={s.profilePage}>

            {showModalWindow ? <ModalWindow setShowModalWindow={setShowModalWindow}/> : null}

            <Paginator/>
            <div className={s.profilePage}>
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
                        <Input onChange={onChangeSearchInput} label={'Search'} type={'text'} value={searchValue}/>
                        <Button onClick={onClickSearch} title={"Search"}/>
                    </div>

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
                    <button onClick={addPackMode}> +</button>
                    <button onClick={showMyPacks}> My packs</button>

                    {pack.map(pack => <Pack key={pack._id} {...pack}/>)}

                </div>

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