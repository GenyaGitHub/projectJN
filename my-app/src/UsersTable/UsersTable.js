import React, { Component } from "react";
import ColumnResizer from 'column-resizer';
import ReactPaginate from 'react-paginate'
import Loader  from '../Loader/Loader';
import Table from "../Table/Table";
import _ from 'lodash'
import TableSearch from "../TableSearch/TableSearch";
import AddUser from "../Adduser/Adduser";




class UsersTable extends Component {


  
    async componentDidMount(){
     
     this.enableResize()
    }
  
  
    onSort = sortField => {
      const clonedData = this.props.s.data.concat()
      const sort = this.props.s.sort === 'asc' ? 'desc' : 'asc'
      const data = _.orderBy(clonedData, sortField, sort)
      this.props.t({data,sort,sortField})
    }
  
    pageChangeHandler = ({selected}) => {
      this.props.t({currentPage: selected})
    }
  
  
    searchHandler = search => {
      this.props.t({search, currentPage: 0})
    }
  
       getFilteredData() {      
        const {data, search} = this.props.s
  
        if(!search) {
          return data
        }
       
  
        const s = data.filter(item => { 
  
          return item['name'].toLowerCase().includes(search.toLowerCase())
            || item['username'].toLowerCase().includes(search.toLowerCase())
            // || item['email'].toLowerCase().includes(search.toLowerCase())
            // || item['phone'].toLowerCase().includes(search.toLowerCase())
  
        })
      
        return s
      }
      enableResize() {
        this.resizer = new ColumnResizer(document.querySelector("#table"), {
          liveDrag:true,
          //draggingClass:"rangeDrag",
          //gripInnerHtml:"<div class='rangeGrip'></div>",
          minWidth:8,
    })};

  
    render(){
      const pageSize = 5
            
      const filteredData =  this.getFilteredData()
  
      const pageCount = Math.ceil((filteredData.length/pageSize))
  
      const displayData = _.chunk(filteredData, pageSize)
      [this.props.s.currentPage]
      return (
      <div className="container">
      { 
        this.props.s.isloading
        ? <Loader />
        : <React.Fragment>
            <TableSearch onSearch={this.searchHandler} />
            {this.props.s.edit ? <AddUser />: null} 
            <Table 
              data={displayData}
              onSort={this.onSort}
              sort= {this.props.s.sort}
              sortField={this.props.s.sortField}
              delete={this.props.onDelete}
              editT={this.props.editTable}
            />
            <AddUser
             s={this.props.s}
             onAdd={this.props.addUser}
             editT={this.props.editTable}
            />

          </React.Fragment>
    } 
  
        
  
        {
        this.props.s.data.length > pageSize
          ?<ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}       /*this.state.pageCount*/
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.pageChangeHandler}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          forcePage={this.props.s.currentPage}
  
          /> : null
      }
      </div>
    );
  }
  }
  
export default UsersTable;