import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import {getPacks, PacksInitialStateType} from "../../store/PacksReducer";
import s from "./Paginator.module.css"
import {InitIsFetchingReducerState} from "../../store/isFetchingReducer";

export const Paginator = React.memo(() => {
    const packs = useSelector<StateType, PacksInitialStateType>(state => state.packs
    )

    const isFetching = useSelector<StateType,InitIsFetchingReducerState>(state => state.isFetching)

    const dispatch = useDispatch()

    const [newPage, setNewPage] = useState<number | string>('')

    const pagesCount = Math.ceil(packs.cardsPacksTotalCount / packs.pageCount);

    const [startPage, setStartPage] = useState<number>(packs.page = 1)

    // const [endPage, setEndPage] = useState(startPage + packs.pageCount)

    let endPage = 10
    if(endPage>pagesCount){
        endPage=pagesCount-1
    }

    let pages: Array<number> = [];
    for (
        let i = startPage;
        i <= (startPage + endPage);
        i++
    ) {
        pages.push(i)
    }

    // пролистывание вверх
    const listUpp = () => {
        let newStartCount = startPage + endPage
        if (newStartCount >= pagesCount) {
           if(newStartCount<packs.pageCount) {newStartCount=1}
           else {
               newStartCount = pagesCount - endPage
           }
        }
        setStartPage(newStartCount)
        // setEndPage(newStartCount + endPage)
        dispatch(getPacks(packs.searchName,newStartCount))
    }

    // пролистывание вниз
    const listDown = () => {
        let newStartCount = startPage - endPage
        if (newStartCount <= 1) {
            newStartCount = 1
        }
        setStartPage(newStartCount)
        // setEndPage(newStartCount + packs.pageCount)
        dispatch(getPacks(packs.searchName,newStartCount))
    }

    // перейти к первой странице
    const toStartPage = () => {
        setStartPage(1)
        // setEndPage(startPage + endPage)
        dispatch(getPacks(packs.searchName,1))
    }

    // перейти к последней странице
    const toEndPage = () => {
        setStartPage(pagesCount)
        // setEndPage(pagesCount)
        dispatch(getPacks(packs.searchName,pagesCount))
    }

    //контроль поля ввода
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.currentTarget.value < 1 || +e.currentTarget.value > pagesCount) {
            setNewPage('нет такой страницы')
        } else {
            setNewPage(+e.target.value)
        }
    }

    //загрузка страницы по номеру из input

    const goToPageNumber = () => {
        let newStartPage = +newPage
        if (+newPage + endPage > pagesCount) {
            newStartPage = pagesCount - endPage
        }
        setStartPage(newStartPage)
        // setEndPage(newStartPage + endPage)
        dispatch(getPacks(packs.searchName,newStartPage))
        setNewPage('')
    }

    //загрузка страницы по номеру из input при нажатии enter
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            goToPageNumber()
        }
    }

    // загрузка страницы по клику
    const onPageChange = (value: number) => {
        dispatch(getPacks(packs.searchName,value))
    }

    let isDisabled = false
    if (isFetching||packs.cardsPacksTotalCount>endPage){
        isDisabled=true
    }

    return <div className={s.sliderWrapper}>
        <div>
            <button
                onClick={() => toStartPage()}
                disabled={isDisabled}
            >
                {"<<"}
            </button>
            <button
                onClick={listDown}
                disabled={isDisabled}
            >
                {'<'}
            </button>
        </div>
        <div>{pages.map(p => <span
            className={packs.page === p ? s.active : s.hover}
            onClick={() => onPageChange(p)}
            key={p}
        >{p}</span>)}</div>
        <div>
            <button
                onClick={listUpp}
                disabled={isDisabled}
            >
                {">"}
            </button>
            <button
                disabled={isDisabled}
                onClick={() => toEndPage()}
            >
                {">>"}
            </button>
        </div>
        <div className={s.inputWrapper}><input type='number'
                                               placeholder='№'
                                               onChange={onChange}
                                               value={newPage == null ? '' : newPage}
                                               className={s.input}
                                               onKeyPress={onKeyPress}
                                               // disabled={isFetching}
        />
            <button onClick={goToPageNumber}
                    disabled={isDisabled}
            >Go
            </button>
        </div>
    </div>
});