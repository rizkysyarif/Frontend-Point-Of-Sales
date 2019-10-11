import { Navbar, Nav, Button } from 'reactstrap';
import React from 'react';
import {Link} from "react-router-dom"

import './nav.css'

class NavBar extends React.Component {
    render() {
        return (
            <Navbar color="light" light expand="md"  sticky={'top'}>
              <Nav className="ml-5">
                <Link to="/Dashboard" className="btn btn-outline-info"><i class="fas fa-chevron-left"></i> Back</Link>
              </Nav> 
            </Navbar>
        )
    }
}

export default NavBar

