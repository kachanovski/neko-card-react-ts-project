import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../store/redux-store";
import {getPacks, PacksInitialStateType} from "../../store/PacksReducer";
import s from "./Paginator.module.scss"
import {InitIsFetchingReducerState} from "../../store/isFetchingReducer";

export const Paginator = (() => {

    const packs = useSelector<StateType, PacksInitialStateType>(state => state.packs)

    const isFetching = useSelector<StateType, InitIsFetchingReducerState>(state => state.isFetching)

    const dispatch = useDispatch()

    const [newPage, setNewPage] = useState<number | string>('')

    const pagesCount = Math.ceil(packs.cardsPacksTotalCount / packs.pageCount);

    const [startPage, setStartPage] = useState<number>(packs.page)

    let endPage = 10
    if (endPage > pagesCount) {
        endPage = pagesCount - 1
    }

    let start = packs.page
    if (start===pagesCount&&endPage<pagesCount)
    {
        start = start - endPage
    }
    let pages: Array<number> = [];
    for (
        let i = start;
        i <= (start + endPage);
        i++
    ) {
        pages.push(i)
    }

    // пролистывание вверх
    const listUpp = () => {
        let newStartCount = packs.page + endPage
        if (newStartCount >= pagesCount) {
            if (newStartCount < packs.pageCount) {
                newStartCount = 1
            } else {
                newStartCount = pagesCount - endPage
            }
        }
        dispatch(getPacks(packs.searchName, newStartCount))
        setStartPage(newStartCount)
    }

    // пролистывание вниз
    const listDown = () => {
        let newStartCount = packs.page - endPage
        if (newStartCount <= 1) {
            newStartCount = 1
        }
        setStartPage(newStartCount)
        dispatch(getPacks(packs.searchName, newStartCount))
    }

    // перейти к первой странице
    const toStartPage = () => {
        setStartPage(1)
        dispatch(getPacks(packs.searchName, 1))
    }

    // перейти к последней странице
    const toEndPage = () => {
        dispatch(getPacks(packs.searchName, pagesCount))
        setStartPage(packs.page - endPage)
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
        dispatch(getPacks(packs.searchName, newStartPage))
        setNewPage('')
    }

    //загрузка страницы по номеру из input при нажатии enter
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            goToPageNumber()
        }
    }

    // загрузка страницы по клику
    const onPageChange = (value: number) => {
        if (pagesCount === 1) return
        dispatch(getPacks(packs.searchName, value))
    }

    let isDisabled = false
    if (!isFetching || pagesCount === startPage) {
        isDisabled = true
    }

    return <div className={s.sliderWrapper}>
        <div>
            {
                isDisabled || packs.page === 1 ? null :
                    <>
                        <button
                            onClick={() => toStartPage()}
                        >
                            {"<<"}
                        </button>
                        <button
                            onClick={listDown}
                        >
                            {'<'}
                        </button>
                    </>
            }
        </div>
        <div>{pages.map(p =>
            <span
                className={packs.page === p ? s.active : ''}
                onClick={() => onPageChange(p)}
                key={p}
            >
                {p}
            </span>)}
        </div>
        <div>
            {isDisabled || pagesCount === packs.page ? null :
                <>
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
                </>}
        </div>
        <div className={s.inputWrapper}>
            {isDisabled || start === pagesCount ? null :
                <>
                    <input type='number'
                           placeholder='№'
                           onChange={onChange}
                           value={newPage == null ? '' : newPage}
                           className={s.input}
                           onKeyPress={onKeyPress}
                    />
                    <button onClick={goToPageNumber}
                    >Go
                    </button>
                </>}
        </div>
    </div>
});