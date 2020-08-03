import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

class UserPortal extends Component {
    constructor() {
        super();
        
        this.state = {
            userList: [],
        }
    }

    componentWillReceiveProps (incomingProps) {
        console.log(incomingProps)
    }

    render() {

        return (
            <div>
                <CssBaseline />
                <h1>Manage Users</h1>
            <hr />

            </div>
        )
    }

}

export default UserPortal