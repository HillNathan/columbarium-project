import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
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
                            messageBoxOpen={this.props.messageBoxOpen}
                            user={userObj} /> )
                })}
            <hr />
            <Button variant="contained" color="primary"                
                onClick={() => this.props.messageBoxOpen({
                    header: "Add User",
                    message: "Module to add a user will go here.",
                    referrer: ""
                })}>

                <span className="lato">Add a User</span>
            </Button>

            </div>
        )
    }

}

export default UserPortal