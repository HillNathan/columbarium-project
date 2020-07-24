import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Spacer from '../Spacer'
import Button from '@material-ui/core/Button';

class LoginForm extends Component {
    constructor() {
        super();
        
        this.state = {
            username: "",
            password: "",
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let { name, value } = event.target;
        this.setState({
          [name]: value
        });
    }

    getFormInfo = (event) => {
        event.preventDefault()
        var userData = {}
        userData.username = this.state.username
        userData.password = this.state.password
        return userData
    }

    render() {

        return (
            <div>
                <CssBaseline />
                <h2>Please Log in to continue:</h2>
                <Spacer />
                <Grid container spacing={1} justify="flex-start">
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                        <TextField id="username" name="username"  label="Username"
                            variant="outlined" value={this.state.username} 
                            onChange={this.handleChange} fullWidth={true} >
                        </TextField>
                    </Grid>
                    <Spacer />
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                        <TextField id="password" name="password"  label="Password"
                            variant="outlined" value={this.state.password} type="password"
                            onChange={this.handleChange} fullWidth={true} >
                        </TextField>
                    </Grid>
                    <Spacer />
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                        <Button color="primary"
                                onClick={ event => this.props.handleLogin(this.getFormInfo(event))}
                        >
                            Login
                        </Button>    
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default LoginForm
