import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Spacer from '../Spacer'

export default function InterredPerson (props) {
    const count = props.index;
    return (
        <Grid container spacing={1} justify="flex-start">
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <TextField id={"salutation" + count} label="Salutation" name="salutation" 
                            InputLabelProps={{ shrink: true, }} variant="outlined" 
                            onChange={props.handleChange}
                            value={props.person.salutation} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"first-name-" + count} label="First Name" name="firstName"
                            InputLabelProps={{ shrink: true, }} variant="outlined" 
                            onChange={props.handleChange}
                            value={props.person.firstName} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"middle-name-" + count} label="Middle Name" name="middleName"
                            InputLabelProps={{ shrink: true, }} variant="outlined" 
                            onChange={props.handleChange}
                            value={props.person.middleName} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"last-name-" + count} label="Last Name" name="lastName"
                            InputLabelProps={{ shrink: true, }} variant="outlined" 
                            onChange={props.handleChange}
                            value={props.person.lastName} />
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <TextField id={"suffix-" + count} label="Suffix" name="suffix" 
                            InputLabelProps={{ shrink: true, }} variant="outlined"
                            onChange={props.handleChange}
                            value={props.person.suffix} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"dob-" + count} label="Date of Birth" name="dateOfBirth" 
                            InputLabelProps={{ shrink: true, }} variant="outlined"
                            onChange={props.handleChange}
                            value={props.person.dateOfBirth} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"dod-" + count} label="Date of Death" name="dateOfDeath" 
                            InputLabelProps={{ shrink: true, }} variant="outlined"
                            onChange={props.handleChange}
                            value={props.person.dateOfDeath} />
            </Grid>
            <Spacer />
        </Grid>
    )
}

