import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ls from 'local-storage'

class Logout extends Component {
    render() {
        ls.remove('token')
        return (
            <>
                <Redirect to = '/' exact />
            </>
        )
    }
}

export default Logout