import React, { Component } from "react";

import _ from 'lodash'

import UserPage from "./UserPage/UserPage";

import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom'; 
import UsersTable from "./UsersTable/UsersTable";



class App extends Component {
  
  constructor(props){
  
    super(props);
    this.ChangeState = this.ChangeState.bind(this);
 }
 
  state= {
    isloading: true,
    data: [],
    maxId: 10,
    search: '',
    sort: 'asc', 
    sortField: 'id',
    currentPage: 0 ,
    show: false,
    edit: false,
    editId: ''
  }

   update = (id) => {
      this.setState({
      
          editId: id,
          edit: true
      }
   
      )}
  deleteItem = (id) => {
    this.setState(({data}) => {
        return {
            data: data.filter(item => item.id !== id)
        }
    })
}

addItem = (newItem) => {
  console.log(newItem)
          this.setState((data) => {
          console.log(data.data)  
              return {
                  data:[...data.data, {...newItem, id: this.state.maxId+1 }],
                  maxId: this.state.maxId+1
              }
          });
      }


   ChangeState(props) {
    this.setState(props)
    
   }

  async componentDidMount(){
   const response = await fetch('https://jsonplaceholder.typicode.com/users')
   const data = await response.json()
   this.setState({
    isloading:false,
    data: _.orderBy(data, this.state.sortField, this.state.sortType)
   })
  }

  render() { 
    return (

  <Router>
   <Routes>
     <Route  path="/" 
      element={<UsersTable s = {this.state } t = {this.ChangeState}  a = {this.onSubmitHandle} onDelete={this.deleteItem} addUser={this.addItem}
      editTable={this.update}    /> } />
     <Route path="/:userId" element={<UserPage s = {this.state} t = {this.ChangeState} />} />
   </Routes>
 </Router>
    )
 }
}

export default App;

