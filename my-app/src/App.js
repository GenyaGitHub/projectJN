import React, { Component } from "react";
import ReactPaginate from 'react-paginate'
import Loader  from './Loader/Loader';
import Table from "./Table/Table";
import _ from 'lodash'





class App extends Component {
  
  state= {
    isloading: true,
    data: [],
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
  }


  onSort = sortField => {
    const clonedData = this.state.data.concat()
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    const data = _.orderBy(clonedData, sortField, sort)
    this.setState({data,sort,sortField})
  }

  pageChangeHandler = (selected) => {
    this.setState({currentPage: selected})
  }

  render(){
    const pageSize = 5

    const displayData = _.chunk(this.state.data, pageSize)
    [this.state.currentPage]


    return (
    <div className="container">
    { 
      this.state.isloading
      ? <Loader />
      : <Table 
        data={displayData}
        onSort={this.onSort}
        sort= {this.state.sort}
        sortField={this.state.sortField}
      />
    }

      

      {
      this.state.data.length > pageSize
        ?<ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={2}       /*this.state.pageCount*/
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
