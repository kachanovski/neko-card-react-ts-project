import React from 'react';
import s from './NotFound.module.scss'


const NotFound = (props: any) => {

    return (
        <div className={s.notFoundPage}>
            <h1>404</h1>
            <div>
                <h1>not found</h1>
                <div>тест</div>
            </div>
        </div>
    )
}

export default NotFound