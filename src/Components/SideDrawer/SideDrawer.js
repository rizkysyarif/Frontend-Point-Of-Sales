import React from 'react'

import './SideDrawer.css'

const sideDrawer = props => {
    let drawerClasses = 'side-drawer'
    if(props.show){
        drawerClasses = 'side-drawer open'
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li><a href="/Dashboard"><i className="fas fa-home" style={{fontSize:'1.3rem'}}/> Home</a></li>
                <li><a href="/History"><i className="fas fa-history" style={{fontSize:'1.3rem'}} /> History</a></li>
                <li><a className="logout" href="/Logout"><i className="far fa-user-circle" style={{fontSize:'1.3rem'}}></i> Logout</a></li>
            </ul>

        </nav>
    )
}

export default sideDrawer