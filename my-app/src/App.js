import React, { Component } from "react";
import ColumnResizer from 'column-resizer';
import ReactPaginate from 'react-paginate'
import Loader  from './Loader/Loader';
import Table from "./Table/Table";
import _ from 'lodash'
import TableSearch from "./TableSearch/TableSearch";




class App extends Component {
  
  state= {
    isloading: true,
    data: [],
    search: '',
    sort: 'asc', 
    sortField: 'id',
    currentPage: 0
  }


  async componentDidMount(){
   const response = await fetch('https://jsonplaceholder.typicode.com/users')
   const data = await response.json()
   this.setState({
    isloading:false,
    data: _.orderBy(data, this.state.sortField, this.state.sortType)
   })
   this.enableResize()
  }


  onSort = sortField => {
    const clonedData = this.state.data.concat()
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    const data = _.orderBy(clonedData, sortField, sort)
    this.setState({data,sort,sortField})
  }

  pageChangeHandler = ({selected}) => {
    this.setState({currentPage: selected})
  }


  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }

     getFilteredData() {      
      let {data, search} = this.state

      if(!search) {
        return data
      }
     

      const s = data.filter(item => { 

        return item['name'].toLowerCase().includes(search.toLowerCase())
          || item['username'].toLowerCase().includes(search.toLowerCase())
          || item['email'].toLowerCase().includes(search.toLowerCase())
          || item['phone'].toLowerCase().includes(search.toLowerCase())

      })
    
      return s
    }
    enableResize() {
      this.resizer = new ColumnResizer(document.querySelector("#table"),{
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
    [this.state.currentPage]
    return (
    <div className="container">
    { 
      this.state.isloading
      ? <Loader />
      : <React.Fragment>
          <TableSearch onSearch={this.searchHandler} />
          <Table 
            data={displayData}
            onSort={this.onSort}
            sort= {this.state.sort}
            sortField={this.state.sortField}
          />
    
        </React.Fragment>
  } 

      

      {
      this.state.data.length > pageSize
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
        forcePage={this.state.currentPage}

        /> : null
    }
    </div>
  );
}
}

export default App;

