import { Navbar, Nav, Button } from 'reactstrap';
import React from 'react';

import './nav.css'

class NavBar extends React.Component {
    render() {
        return (
            <Navbar color="light" light expand="md"  sticky={'top'}>
              <Nav className="ml-5">
                <Button outline color="info" href="Dashboard"><i class="fas fa-chevron-left"></i> Back</Button>
              </Nav> 
            </Navbar>
        )
    }
}

export default NavBar

