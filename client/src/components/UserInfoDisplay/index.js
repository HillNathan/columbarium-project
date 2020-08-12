import React from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import VariableSpacer from '../VariableSpacer'

export default function UserInfo (props) {
    //==================================================================================================
    // props for this component will be an object that contains the information for a specific user, 
    //   as well as a click function for a button so that we can click to edit this specific user
    //   and a click function to reset their password
    //==================================================================================================
    
    return (
    <div>
      <Grid container spacing={1} justify="flex-start">
        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <TextField id={"First Name"} label="First Name" name="firstName" 
                InputLabelprops={{ shrink: true, }} variant="outlined" 
                value={props.user.firstName} />
        </Grid>
        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <TextField id={"Last Name"} label="Last Name" name="lasstName" 
                InputLabelprops={{ shrink: true, }} variant="outlined" 
                value={props.user.lastName} />
        </Grid>
        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <TextField id={"Username"} label="Username" name="username" 
                InputLabelprops={{ shrink: true, }} variant="outlined" 
                value={props.user.username} />
        </Grid>
        <Grid item>
            <Button variant="contained" color="primary"
                onClick={() => props.messageBoxOpen({
                    header: "Reset Password",
                    message: "Module to reset the password will go here.",
                    referrer: ""
                })}>
                <span className="lato">Reset Password</span>
            </Button>
        </Grid>
        <Grid item>
            <Button variant="contained" color="primary"
                onClick={() => props.messageBoxOpen({
                    header: "Edit User",
                    message: "Module to edit the user information will go here.",
                    referrer: ""
                })}>
                <span className="lato">Edit User</span>
            </Button>
        </Grid>
      </Grid>
      <VariableSpacer height={20} />
    </div>
    )
}


