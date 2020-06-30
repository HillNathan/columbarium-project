import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Spacer from '../Spacer'
import Button from '@material-ui/core/Button';

import InterredPerson from '../InterredPerson'

const statusList = ['AVAILABLE', 'RESERVED', 'OCCUPIED', 'PENDING', 'SLATE-AVAILABLE', 'SLATE-RESERVED', 
'SLATE-OCCUPIED', 'WALL', 'FLOWERS']

class PlotEditor extends Component {
    constructor() {
        super();
        
        this.state = {
            data: null,
            plotNum: 0,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let { name, value } = event.target;
    
        this.setState({
          [name]: value
        });
    }

    componentWillReceiveProps (incomingProps) {
        this.setState({ 
            data: incomingProps.data,
            plotNum: incomingProps.plot,
            status: incomingProps.data.status,
            reservedBy: incomingProps.data.reservedBy,
            certificate: incomingProps.data.certificate,
            reservedDate: incomingProps.data.reservedDate,
            numInterred: incomingProps.data.numInterred,
            notes: incomingProps.data.notes,
            interred: incomingProps.data.interred,
        })
    }

    render() {

        return (
            <div>
                <CssBaseline />
               {(this.state.plotNum === 0) ? (
                   <h2>Please enter a plot number</h2>
               ) : (
                <Container maxWidth="xl" >
                    <Grid container spacing={1} justify="flex-start">
                        <Grid item xl={8} lg={8} md={8} sm={8} xs={8} >
                            <h2>Plot information for Plot #{this.state.plotNum}</h2>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                            <Button color="primary">
                                Add a Person
                            </Button>    
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                            <Button color="primary">
                                Save Changes
                            </Button>    
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                        <TextField
                            id="plot-status"
                            variant="outlined"
                            name="status"
                            select
                            value={this.state.status}
                            onChange={this.handleChange}
                            label="Plot status"
                            fullWidth={true}
                            >
                            {statusList.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                        </TextField>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                            <TextField id="certificate" name="certificate" label="Certificate #" 
                                        variant="outlined" value={this.state.certificate} />
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} sx={3}>
                            <TextField id="num_interred" name="numInterred" label="How Many Interred" 
                                        variant="outlined" value={this.state.numInterred} />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} sx={6} >
                            <TextField id="reserved_by" name="reservedBy" label="Reserved By" fullWidth={true}
                                        variant="outlined" value={this.state.reservedBy} />
                        </Grid>
                        <Grid item lg={3}>
                            <TextField id="reserved_date" name="reservedDate" label="Date of Reservation" 
                                        variant="outlined" value={this.state.reservedDate} />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                            <TextField id="notes" name="notes" label="Notes" value={this.state.notes} 
                                        variant="outlined" fullWidth={true} multiline rows={4}/>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} sx={2} />
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} />
                    </Grid>
                    <Divider />
                    <Spacer height={20} />
                    {this.state.interred.map((person, index) => {
                        return (<InterredPerson key={index}
                            person={person}
                            index={index}
                        /> )
                    })}                    
                </Container>
               )}
            </div>
    )}
}

export default PlotEditor