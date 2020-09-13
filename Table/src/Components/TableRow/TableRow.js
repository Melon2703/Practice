import React from 'react';

function TableRow(props) {
    return (
        <tr id={props.ID}>
            <td>{props.user.id}</td>
            <td>{props.user.firstName}</td>
            <td>{props.user.lastName}</td>
            <td>{props.user.email}</td>
            <td>{props.user.phone}</td>
        </tr>
    );
}

export default TableRow;