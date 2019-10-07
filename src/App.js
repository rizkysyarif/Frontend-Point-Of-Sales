import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import './App.css'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Dashboard from './Components/Dashboard'
import Add from './Screens/Add'
import Logout from './Screens/Logout'
import ManageProduct from './Screens/ManageProduct'




class App extends Component {
  render(){
    return(
      //<Provider>
        <Router>
          <Route exact path={'/'} component={Login}></Route>
          <Route exact path={'/Register'} component={Register}></Route>
          <Route exact path={'/Dashboard'} component={Dashboard}></Route>
          <Route exact path={'/Add'} component={Add}></Route>
          <Route exact path={'/Logout'} component={Logout}></Route>
          <Route exact path={'/ManageProduct'} component={ManageProduct}></Route>

        </Router>
     // </Provider>
    )
  }
}

export default App