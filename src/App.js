import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Navigation from './Components/Navigations'
import Add from './Screens/Add'




class App extends Component {
  constructor(props){
    super()
    this.state = {
      name : 'Arkademy'
    }
  }

  render(){
    return(
      <div className='App-link'>
        <Router>
          <Route exact path={'/'} component={Navigation}></Route>
          <Route exact path={'/Login'} component={Login}></Route>
          <Route exact path={'/Register'} component={Register}></Route>
          <Route exact path={'/Add'} component={Add}></Route>

        </Router>
      </div>
    )
  }
}

export default App