import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Spacer from '../Spacer'

export default function InterredPerson (props) {
    const count = props.index;
    return (
        <Grid container spacing={1} justify="flex-start">
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <TextField id={"salutation" + count} label="Salutation" variant="outlined"
                            InputLabelProps={{ shrink: true, }}
                            value={props.person.salutation} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"first-name-" + count} label="First Name" variant="outlined"
                            InputLabelProps={{ shrink: true, }}
                            value={props.person.firstName} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"middle-name-" + count} label="Middle Name" variant="outlined"
                            InputLabelProps={{ shrink: true, }}
                            value={props.person.middleName} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"last-name-" + count} label="Last Name" variant="outlined"
                            InputLabelProps={{ shrink: true, }}
                            value={props.person.lastName} />
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <TextField id={"suffix-" + count} label="Suffix" variant="outlined"
                            InputLabelProps={{ shrink: true, }}
                            value={props.person.suffix} />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"dob-" + count} label="Date of Birth" variant="outlined"
                            InputLabelProps={{ shrink: true, }}
                            value="" />
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <TextField id={"dod-" + count} label="Date of Death" variant="outlined"
                            InputLabelProps={{ shrink: true, }}
                            value="" />
            </Grid>
            <Spacer />
        </Grid>
    )
}

