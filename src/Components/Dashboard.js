import React from 'react';
import '../assets/css/nav.css'
import Menu from '../Screens/Menu'
import NavBar from './Navbar'
import SideDrawer from './SideDrawer/SideDrawer'
import Backdrop from './Backdrop/Backdrop'
import Axios from 'axios';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    }   
  }
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen:false})
  }
 
  getAll = async (value) => {
    await Axios.get('http://localhost:9000/api/product?search='+ value)
    .then(result => {
      this.setState({data: result.data.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  
  render() {
    let backdrop

    if(this.state.sideDrawerOpen){
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <div>
        <NavBar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen}/>
        {backdrop}
        <Menu />
      </div>
      


      
      
    );
  }
}