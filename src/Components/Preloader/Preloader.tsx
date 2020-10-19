import React from 'react';
import s from './Preloader.module.scss'

type PreloaderType = {

}

const Preloader = (props: PreloaderType) => {
    return (
        <div className={s.cssload_container}>
            <div className={s.cssload_speeding_wheel}></div>
        </div>
    )
}

export default Preloader