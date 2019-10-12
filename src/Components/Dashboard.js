import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Row, Button, Col, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import '../assets/css/nav.css'
import Menu from '../Screens/Menu'
import Sidebar from './Sidebar'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    
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

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  render() {
    return (
      <div>
        <Row>
          <Col xs="1">
            <Sidebar />
          </Col>
          <Col xs="11"  style={{ marginLeft: "-40px" }}>
            <Navbar color="light" light expand="md"style={{  }} >
            <Nav className="" >
              <NavbarBrand className="ml-5">Items</NavbarBrand>
            </Nav>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <i class="far fa-user-circle"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Button outline color="danger" href="Logout">Logout</Button>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
            
          </Navbar>

        <Menu/>
          </Col>
        </Row>
        
      
      </div>
      


      
      
    );
  }
}