import React from "react";
let Table = props => (
    <table className="table" id="table">
    <thead>
      <tr>
        <th id="ID"onClick={props?.onSort.bind(null, 'id')}>
            ID {props?.sortField === 'id' ? <small>{props.sort}</small> : null}
        </th>
        <th id="Name" onClick={props?.onSort.bind(null, 'name')}>
            Name {props?.sortField === 'name' ? <small>{props.sort}</small> : null}
        </th>
        <th id="Username" onClick={props?.onSort.bind(null, 'username')}>
            Username {props?.sortField === 'username' ? <small>{props.sort}</small> : null}
        </th>
        <th id="Email" onClick={props?.onSort.bind(null, 'email')}>
            Email {props?.sortField === 'email' ? <small>{props.sort}</small> : null}
        </th>
        <th id="Phone"  onClick={props?.onSort.bind(null, 'phone')}>
            Phone {props?.sortField === 'phone' ? <small>{props.sort}</small> : null}
        </th>
      </tr>
    </thead>
    <tbody>
        {props.data?.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
        </tr>
        ))}
    </tbody>
    </table>
)
export default Table;