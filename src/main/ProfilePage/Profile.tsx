import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import Button from "../../Components/Button/Button";
import {AuthMe, setLogOutUser} from "../../store/LoginReducer";
import {Redirect} from "react-router-dom";
import {getPacks, PackType} from '../../store/PacksReducer';
import Input from "../../Components/Input/Input";
import {Paginator} from "../../Components/Paginator/Paginator";


type ProfileType = {
    isFetching: boolean
}

type SearchInputForm = {
    searchName: string
    searchRange: string
}

const Profile = (props: ProfileType) => {
    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const pack = useSelector<StateType, Array<PackType>>(state => state.packs.packs)
    const dispatch = useDispatch()

    const [rangeValue, setRangeValue] = useState('')
    const [searchValue, setSearchValue] = useState('')


    const onChangeSearchInput = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    const onChangeRangeInput = (e:ChangeEvent<HTMLInputElement>) => {
        setRangeValue(e.currentTarget.value)
    }

    const onClickSearch = () => {
        const searchData = searchValue
        dispatch(getPacks(searchData))
    }

    /* useEffect(() => {
         dispatch(GetProfileDataTC())
     }, [dispatch])*/

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
        <>
            <Paginator/>
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
                    <div className={s.searchField}>
                        <Input onChange={onChangeSearchInput} type={'text'} value={searchValue} />
                        <Button onClick={onClickSearch} title={"Search"} />
                    </div>


                        <div className={s.packsContainer}>
                            <div>
                                Name
                                <button>up</button>
                                <button>down</button>
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
        </>
)
}

export default Profile


const Pack = () => {
    return (
    <div className={s.cardField}>

    </div>
    )
}