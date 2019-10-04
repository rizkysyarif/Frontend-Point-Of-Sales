import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Form, Button, Input, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import './nav.css'
import Menu from '../Screens/Menu'
import Axios from 'axios';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    
  }
 
  getAll = async (value) => {
    await Axios.get('http://localhost:7373/api/product?search='+ value)
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
        <Navbar color="light" light expand="md">
        <Button className="btn btn-sm" outline color="success" data-target="#modal-form" href="Add" ><i className="fas fa-plus" ></i></Button>
          <Nav className="m-auto">
            <NavbarBrand>Items</NavbarBrand>
          </Nav>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              
          
              <NavItem>
                <NavLink href=""><i class="fas fa-home"></i>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href=""><i class="fas fa-history"></i>History</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <i class="far fa-user-circle"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Button outline color="success" href="login">Login</Button>
                  </DropdownItem>
                  <DropdownItem>
                    <Button outline color="primary" href="register">Register</Button>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          
        </Navbar>

        <Menu/>
      
      </div>
      


      
      
    );
  }
}