import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import UserInfo from '../UserInfoDisplay'

class UserPortal extends Component {
    constructor() {
        super();
        
        this.state = {
            userList: [],
        }
    }

    componentWillReceiveProps (incomingProps) {
        this.setState({
            userList: incomingProps.userList
        })
    }

    render() {

        return (
            <div>
                <CssBaseline />
                <h1>Manage Users</h1>
            <hr />
                {this.props.userList.map(userObj => {
                    return (
                        <UserInfo
                            user={userObj} /> )
                })}
            </div>
        )
    }

}

export default UserPortal