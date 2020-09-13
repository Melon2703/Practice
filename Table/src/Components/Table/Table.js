import React from 'react';
import TableRow from "../TableRow/TableRow";
import cn from "classnames";
import styles from "./Table.module.scss"

function Table(props) {

    let rows = props.Users.map((item, id) => {
        return (
            <TableRow user={item} key={id} ID={id}/>
        )
    });

    let sort_findMethod = (e) => {
        let target = e.target;
        if (target.tagName === "TD" && target.closest("thead")) {
            //Считываем значение атрибута value, где находится значение, по которому происходит сортировка
            props.sortTable(target.getAttribute("value"));
        } else if (target.tagName === "TD" && target.closest("tbody")) {
            //У каждой строки есть id, который соответсвует id пользователя, находящегося в ней. Считываем id со строки
            //и находим по этому id нужного пользователя среди всех пользователей ( через find )
            props.setUser(+target.closest("tr").id);
        }
    }
    console.log(props.columnName);
    return (
        <table className={cn(styles.table)} onClick={sort_findMethod}>
            <thead>
            <tr>
                <td value="id">id {(props.columnName === "id") ? props.sorted ? "↑" : "↓" : null}</td>
                <td value="firstName">firstName {(props.columnName === "firstName") ? props.sorted ? "↑" : "↓" : null}</td>
                <td value="lastName">lastName {(props.columnName === "lastName") ? props.sorted ? "↑" : "↓" : null}</td>
                <td value="email">email {(props.columnName === "email") ? props.sorted ? "↑" : "↓" : null}</td>
                <td value="phone">phone {(props.columnName === "phone") ? props.sorted ? "↑" : "↓" : null}</td>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    );
}

export default Table;
