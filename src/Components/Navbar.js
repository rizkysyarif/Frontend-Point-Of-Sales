// import { Navbar, Nav, Button } from 'reactstrap';
// import React from 'react';
// import {Link} from "react-router-dom"

// import '../assets/css/nav.css'

// class NavBar extends React.Component {
//     render() {
//         return (
//             <Navbar color="light" light expand="md">
//               <Nav className="ml-5">
//                 <Link to="/Dashboard" className="btn btn-outline-info"><i class="fas fa-chevron-left"></i> Back</Link>
//               </Nav> 
//             </Navbar>
//         )
//     }
// }

// export default NavBar
import React from 'react'

import DrawerToggleButton from './SideDrawer/DrawerToggleButton'
import './Navbar.css'

const NavBar = props => (
  <header className="nav">
    <nav className="navbar">
      <div className="nav-toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="nav_logo"><a href="/Dashboard">RiztMart</a></div>
      <div className="nav-items">
        <ul>
          <li><a href="/Dashboard"><i className="fas fa-home" style={{fontSize:'1.3rem'}}/>Home</a></li>
          <li><a href="/History"><i className="fas fa-history" style={{fontSize:'1.3rem'}} /> History</a></li>
          <li><a className="logout" href="/Logout"><i className="far fa-user-circle" style={{fontSize:'1.3rem'}}></i> Logout</a></li>
        </ul>
      </div>
    </nav>
  </header>
)

export default NavBar
