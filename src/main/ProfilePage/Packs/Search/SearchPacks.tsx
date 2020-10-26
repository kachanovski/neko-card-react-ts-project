import React, {ChangeEvent} from "react";
import s from "../../Profile.module.scss";
import Input from "../../../../Components/Input/Input";
import Button from "../../../../Components/Button/Button";

type SearchPacksType = {
    onClickSearch: () => void
    onChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void
    searchValue: string
}

const SearchPacks = (props: SearchPacksType) => {
    return (
        <div className={s.searchField}>
            <Input onChange={props.onChangeSearchInput} label={'Search'} type={'text'} value={props.searchValue}/>
            <Button onClick={props.onClickSearch} title={"Search"}/>
        </div>
    )
}

export default SearchPacks