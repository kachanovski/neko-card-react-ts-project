import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from './Menu.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {logOutAction, setLogOutUser} from "../../store/LoginReducer";
import {StateType} from "../../store/redux-store";

const Menu = () => {

    const [isHide, setIsHide] = useState(false)
    const authMe = useSelector<StateType, boolean>(state => state.login.authMe)
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(logOutAction())
        dispatch(setLogOutUser())
    }

    const showMenu = () => {
        setIsHide(false)
    }
    const hideMenu = () => {
        setIsHide(true)
    }

    return (
        <div className={s.menu}>
            {isHide
                ? <button onClick={showMenu}>menu</button>
                : <div className={s.menuActive}>
                    <button onClick={hideMenu}>menu</button>
                    <NavLink to='/restore' className={s.link} activeClassName={s.activeLink}>Forgot password</NavLink>
                    <NavLink to='/register' className={s.link} activeClassName={s.activeLink}>Register</NavLink>
                    {
                        authMe
                            ? <NavLink onClick={logOut} to='/login' className={s.link} activeClassName={s.activeLink}>
                                Log out
                            </NavLink>
                            : <NavLink to='/login' className={s.link} activeClassName={s.activeLink}>Login</NavLink>
                    }
                    <NavLink to='/profile' className={s.link} activeClassName={s.activeLink}>Profile</NavLink>
                </div>
            }
        </div>

    )
}

export default Menu