import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../assets/css/Sidebar.css'
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Form } from 'reactstrap';

class SideNav extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            width: "90px",
            currentNav: "open",
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onChange = (state) => {
        this.setState({
            currentNav: (state === "open" ? "close" : "open")
        })

        if (state === "open") {
            this.openNav()
        } else {
            this.closeNav()
        }
    }

    openNav() {
        this.setState({ width: "250px" })
    }

    closeNav() {
        this.setState({ width: "90px" })
    }


    render() {
        return (
            <div>
                <div id="mySidebar" className="sidebar"  style={{ width: this.state.width }} >
                    <button id="btnNav" className="closebtn mr-3" onClick={() => this.onChange(this.state.currentNav)}><i class="fas fa-bars"></i> </button>

                    <Link to="/Dashboard" className="sidemenu" > <i class="fas fa-home" /> </Link> 
                    <Link to="/History" className="sidemenu" > <i class="fas fa-history"></i></Link>
                    <Link to="/ManageProduct" className="sidemenu" > <i class="fas fa-wrench"></i> </Link>

                     {/* <Link to="/ManageProduct" className="nav-link"><i class="fas fa-wrench"></i>Product</Link> */}
                     {/* className="nav-link" */}
                </div>
            </div>
        );
    }

};

export default SideNav;