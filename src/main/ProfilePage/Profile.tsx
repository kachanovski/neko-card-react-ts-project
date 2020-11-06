import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import Button from "../../Components/Button/Button";
import {AuthMe, InitialLoginReducerState, setLogOutUser} from "../../store/authReducers/LoginReducer";
import {Redirect} from "react-router-dom";
import {getPacks, PackType, setMyPacksAC, getMyPacksTC, sortPacks} from '../../store/profileReducers/PacksReducer';
import {ModalWindow} from './Packs/ModalWindow/ModalWindow';
import {Paginator} from "../../Components/Paginator/Paginator";
import SearchPacks from './Packs/Search/SearchPacks';
import Pack from "./Packs/Pack";
import AddButton from "../../Components/AddButton/AddButton";

type ProfileType = {
    isFetching: boolean
}

const Profile = React.memo((props: ProfileType) => {
        const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
        const profile = useSelector<StateType, InitialLoginReducerState>(state => state.login)
        const pack = useSelector<StateType, Array<PackType>>(state => state.packs.packs)
        const userID = useSelector<StateType, string>(state => state.login._id)
        const searchName = useSelector<StateType, string>(state => state.packs.searchName)
        const isMyPack = useSelector<StateType, boolean>(state => state.packs.isMyPacks)
        const dispatch = useDispatch()

        useEffect(() => {
            !authMe && dispatch(AuthMe())
        }, [dispatch, authMe])


        useEffect(() => {
            !isMyPack && dispatch(getPacks(searchName))
        }, [dispatch, searchName, isMyPack])

        useEffect(() => {
            isMyPack && dispatch(getMyPacksTC(userID))
        }, [dispatch, isMyPack, userID])

        const [sortUp, setSortUp] = useState(false)
        const [sortDown, setSortDow] = useState(false)
        const [showModalWindow, setShowModalWindow] = useState<boolean>(false)
        const [searchValue, setSearchValue] = useState<string>('')

        const onChangeSearchInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.currentTarget.value)
        }, [])
        const onClickSearch = () => {
            dispatch(getPacks(searchValue))
        }

        const logOut = useCallback(() => {
            dispatch(setLogOutUser())
        }, [dispatch])
        const addPackMode = useCallback(() => {
            setShowModalWindow(true)
        }, [])
        const onClickSortUpName = useCallback(() => {
            dispatch(sortPacks(-1))
            setSortUp(true)
            setSortDow(false)
        }, [dispatch])
        const onClickSortDownName = useCallback(() => {
            dispatch(sortPacks(1))
            setSortUp(false)
            setSortDow(true)
        }, [dispatch])
        const resetSort = useCallback(() => {
            dispatch(getPacks(searchName))
            setSortUp(false)
            setSortDow(false)
        }, [dispatch, searchName])


        const changeIsMyPack = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setMyPacksAC(e.target.checked))
        }, [dispatch])

        if (!authMe) return <Redirect to={'/login'}/>

        return (

            <div className={s.profilePage}>

                {showModalWindow
                    ? <ModalWindow isMyPack={isMyPack} userID={userID} searchName={searchName}
                                   setShowModalWindow={setShowModalWindow}
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

                        <AddButton onClick={addPackMode}/>
                        Only My Packs: <input type={'checkbox'} checked={isMyPack} onChange={changeIsMyPack}/>

                        <div className={s.packsContainer}>
                            <div>
                                Name
                                {!sortUp
                                    ? <button onClick={onClickSortUpName}>up</button>
                                    : <button className={s.activeSort} onClick={resetSort}>up</button>}
                                {!sortDown
                                    ? <button onClick={onClickSortDownName}>down</button>
                                    : <button className={s.activeSort} onClick={resetSort}>down</button>}
                            </div>
                            <div>
                                Cards
                            </div>
                            <div>
                                Update
                            </div>
                            <div>email/user_name</div>
                            <div>

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
)
export default Profile
