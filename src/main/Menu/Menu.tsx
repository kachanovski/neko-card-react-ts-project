import React, {useCallback, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import s from './Menu.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AuthMe, setLogOutUser} from "../../store/LoginReducer";
import {StateType} from "../../store/redux-store";

const Menu = React.memo (() => {

    const [isHide, setIsHide] = useState(true)
    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(AuthMe())
    }, [])

    const logOut = () => {
        dispatch(setLogOutUser())
    }
    const showHideMenuTrigger = useCallback(() => {
        if (isHide) setIsHide(false)
        if (!isHide) setIsHide(true)
    },[isHide])
    // const hideMenu = () => {
    //     setIsHide(true)
    // }
    // const showMenu = () => {
    //     setIsHide(false)
    // }
    console.log('Menu render')

    return (
        <div className={s.menu}>

            <button onClick={showHideMenuTrigger}>menu</button>
            {isHide && <div className={s.menuActive}>
                <NavLink to='/restore' className={s.link} activeClassName={s.activeLink}>Forgot password</NavLink>
                <NavLink to='/register' className={s.link} activeClassName={s.activeLink}>Register</NavLink>
                {authMe
                    ? <NavLink onClick={logOut} to='/login' className={s.link} activeClassName={s.activeLink}>
                        Log out
                    </NavLink>
                    : <NavLink to='/login' className={s.link} activeClassName={s.activeLink}>Login</NavLink>}
                <NavLink to='/profile' className={s.link} activeClassName={s.activeLink}>Profile</NavLink>
            </div>}

            {/*{isHide*/}
            {/*    ? <button onClick={showMenu}>menu</button>*/}
            {/*    : <div className={s.menuActive}>*/}
            {/*        <button onClick={hideMenu}>menu</button>*/}
            {/*        <NavLink to='/restore' className={s.link} activeClassName={s.activeLink}>Forgot password</NavLink>*/}
            {/*        <NavLink to='/register' className={s.link} activeClassName={s.activeLink}>Register</NavLink>*/}
            {/*        {*/}
            {/*            authMe*/}
            {/*                ? <NavLink onClick={logOut} to='/login' className={s.link} activeClassName={s.activeLink}>*/}
            {/*                    Log out*/}
            {/*                </NavLink>*/}
            {/*                : <NavLink to='/login' className={s.link} activeClassName={s.activeLink}>Login</NavLink>*/}
            {/*        }*/}
            {/*        <NavLink to='/profile' className={s.link} activeClassName={s.activeLink}>Profile</NavLink>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>

    )
})

export default Menu