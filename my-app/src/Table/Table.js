import React from "react";
import "./Table.css"
import { Link } from 'react-router-dom';



let Table = props => (
    <table className="table" id="table">
    <thead>
      <tr className="tr">
        <th  onClick={props?.onSort.bind(null, 'id')}>
            ID {props?.sortField === 'id' ? <small>{props.sort}</small> : null}
        </th>
        <th onClick={props?.onSort.bind(null, 'name')}>
            Name {props?.sortField === 'name' ? <small>{props.sort}</small> : null}
        </th>
        <th onClick={props?.onSort.bind(null, 'username')}>
            Username {props?.sortField === 'username' ? <small>{props.sort}</small> : null}
        </th>
        <th> 
           Actions 
        </th>
        {/* <th onClick={props?.onSort.bind(null, 'email')}>
            Email {props?.sortField === 'email' ? <small>{props.sort}</small> : null}
        </th>
        <th onClick={props?.onSort.bind(null, 'phone')}>
            Phone {props?.sortField === 'phone' ? <small>{props.sort}</small> : null}
        </th> */}
      </tr>
    </thead>
    <tbody>
        {props.data?.map((item,i) => (
        <tr className="tr" key={item.id} >        
            <td>
             <Link to={`/${item.id}`}>
                {item.id}
             </Link>
            </td>             
            <td>
             <Link to={`/${item.id}`}>
                {item.name}
             </Link>
            </td>
            <td>
            <Link to={`/${item.id}`}>
                {item.username}
            </Link>
            </td>
            {/* <td>
            <Link to={`/${item.id}`}>
                {item.email}
            </Link>
            </td>
            <td>
            <Link to={`/${item.id}`}>
                {item.phone}
            </Link>
            </td>         */}
            <td>
             <button type="button"
             className="btn-trash btn-sm "
             onClick={(e) => props.delete(item.id)}>
            
            <i className="fas fa-trash"></i>
            Delete
             </button>
             <button type="button"
             className="btn-trash btn-sm "
             onClick={(e) => props.editT(item.id)}>
            <i className="fas fa-trash"></i>
            Update
             </button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
)
export default Table;