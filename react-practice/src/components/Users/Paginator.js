import React, {useState} from "react";
import cn from "classnames";
import styles from "./Paginator.module.css"


const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    //Готовим порции для кнопок
    let potrionCount = Math.ceil(pagesCount/props.portionSize);
    let [portionNumber, changePortionNumber] = useState(Math.floor(props.currentPage / props.portionSize) + 1);

    if(props.currentPage % props.portionSize === 0){
        --portionNumber;
    }


    let leftSideOfPortion = (portionNumber*props.portionSize)-(props.portionSize-1);
    let rightSideOfPortion = portionNumber*props.portionSize;

    return (
        <div className={cn(styles.page_block)}>
            {portionNumber > 1 && <button className={cn(styles.prev_button)} onClick={() => changePortionNumber(props.currentPage % props.portionSize === 0? portionNumber : --portionNumber)}>➜</button>}

            {pages.filter(p => p >= leftSideOfPortion && p <= rightSideOfPortion)
                .map(p => <span onClick={() => {
                props.changeCurrentPage(p)
            }} className={ cn(styles.page, props.currentPage === p && styles.selected)}>{p} </span>)}

            {potrionCount > portionNumber && <button className={cn(styles.next_button)} onClick={() => changePortionNumber(props.currentPage % props.portionSize === 0? portionNumber + 2 : ++portionNumber)}>➜</button>}
        </div>
    )
}

export default Paginator;