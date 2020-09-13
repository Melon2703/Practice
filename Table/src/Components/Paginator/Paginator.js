import React, {useEffect, useState} from "react";
import cn from "classnames";
import styles from "./Paginator.module.scss"

const Paginator = (props) => {

    useEffect(() => {
        changePortionNumber(1);
    }, [props.isFiltered])

    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    //Готовим порции для кнопок
    let potrionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, changePortionNumber] = useState(1);

    // if (props.currentPage % props.portionSize === 0) {
    //     --portionNumber;
    // }


    let leftSideOfPortion = (portionNumber * props.portionSize) - (props.portionSize - 1);
    let rightSideOfPortion = portionNumber * props.portionSize;

    return (
        <div className={cn(styles.page_block)}>
            {portionNumber > 1 && <button className={cn(styles.prev_button)}
                                          onClick={() => changePortionNumber(--portionNumber)}>➜</button>}

            {pages.filter(p => p >= leftSideOfPortion && p <= rightSideOfPortion)
                .map(p => <span key={p} onClick={() => {
                    props.changeCurrentPage(p)
                }} className={cn(styles.page, props.currentPage === p && styles.selected)}>{p} </span>)}

            {potrionCount > portionNumber && <button className={cn(styles.next_button)}
                                                     onClick={() => changePortionNumber(++portionNumber)}>➜</button>}
        </div>
    )
}

export default Paginator;