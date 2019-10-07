import { Navbar, Nav, NavLink } from 'reactstrap';
import React from 'react';

import './nav.css'

class NavBar extends React.Component {
    render() {
        return (
            <Navbar color="light" light expand="md">
              <Nav className="ml-5">
                <NavLink href="Dashboard"><i class="fas fa-home"></i>Home</NavLink>
              </Nav> 
            </Navbar>
        )
    }
}

export default NavBar

