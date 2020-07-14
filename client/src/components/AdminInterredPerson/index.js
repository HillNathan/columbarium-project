import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Spacer from '../Spacer'


class InterredPerson extends Component {
    // state = {
    //     startDate : this.props.person.dateOfBirth
    // }

    handleDateChange = (event, key, theIndex) => {
        this.props.handleDateChange(event, key, theIndex)
        this.setState({
            startDate : event
        })
      };

    render() {
        return (
            <Grid container spacing={1} justify="flex-start">
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <TextField id={"salutation" + this.props.index} label="Salutation" name="salutation" 
                                InputLabelprops={{ shrink: true, }} variant="outlined" 
                                onChange={this.props.handleChange}
                                value={this.props.person.salutation} />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                    <TextField id={"first-name-" + this.props.index} label="First Name" name="firstName"
                                InputLabelprops={{ shrink: true, }} variant="outlined" 
                                onChange={this.props.handleChange}
                                value={this.props.person.firstName} />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                    <TextField id={"middle-name-" + this.props.index} label="Middle Name" name="middleName"
                                InputLabelprops={{ shrink: true, }} variant="outlined" 
                                onChange={this.props.handleChange}
                                value={this.props.person.middleName} />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                    <TextField id={"last-name-" + this.props.index} label="Last Name" name="lastName"
                                InputLabelprops={{ shrink: true, }} variant="outlined" 
                                onChange={this.props.handleChange}
                                value={this.props.person.lastName} />
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                    <TextField id={"suffix-" + this.props.index} label="Suffix" name="suffix" 
                                InputLabelprops={{ shrink: true, }} variant="outlined"
                                onChange={this.props.handleChange}
                                value={this.props.person.suffix} />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                    <TextField id={"dob-" + this.props.index} label="Date of Birth" name="dateOfBirth" 
                                InputLabelprops={{ shrink: true, }} variant="outlined"
                                onChange={this.props.handleChange} 
                                value={this.props.person.dateOfBirth} />
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                    <TextField id={"dod-" + this.props.index} label="Date of Death" name="dateOfDeath" 
                                InputLabelprops={{ shrink: true, }} variant="outlined"
                                onChange={this.props.handleChange}
                                value={this.props.person.dateOfDeath} />
                </Grid>
                <Spacer />
            </Grid>
        )
    }
}

export default InterredPerson