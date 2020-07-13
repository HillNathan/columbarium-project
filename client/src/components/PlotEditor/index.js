import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Spacer from '../Spacer'
import Button from '@material-ui/core/Button';

import FileUploader from '../FileUpload'
import AdminInterredPerson from '../AdminInterredPerson'

const statusList = ['AVAILABLE', 'RESERVED', 'OCCUPIED', 'PENDING', 'SLATE-AVAILABLE', 'SLATE-RESERVED', 
'SLATE-OCCUPIED', 'WALL', 'FLOWERS']

class PlotEditor extends Component {
    constructor() {
        super();
        
        this.state = {
            plotNum: 0,
            status: "",
            reservedBy: "",
            certificate: "",
            reservedDate: "",
            numInterred: "",
            notes: "",
            interred: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleArrayChange = this.handleArrayChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleChange(event) {
        let { name, value } = event.target;
    
        this.setState({
          [name]: value
        });
    }

    handleArrayChange(event) {
        let { name, value, id } = event.target;
        var myIndex = parseInt(id.slice(id.length-1))
        var tempArray = this.state.interred
        tempArray[myIndex][name] = value
        this.setState({
          interred: tempArray
        });
    }

    handleDateChange(newDate, whichDate, index) {
        console.log("PlotEditor handleDateChange...")
        var tempArray = this.state.interred
        tempArray[index][whichDate] = newDate
        this.setState({
            interred: tempArray
          });  
    }

    componentWillReceiveProps (incomingProps) {
        this.setState({ 
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

    getFormInfo = () => {
        var plotData = {}
        plotData.plot = {}
        plotData.plot.status = this.state.status
        plotData.plot.plotNumber = this.state.plotNum
        plotData.plot.certificate = this.state.certificate
        plotData.plot.reservedBy = this.state.reservedBy
        plotData.plot.reservedDate = this.state.reservedDate
        plotData.plot.numInterred = this.state.numInterred
        plotData.plot.notes = this.state.notes
        plotData.interredArray = this.state.interred
        plotData.newPerson = this.state.newPerson
        console.log("getFormInfo")
        console.log(plotData)
        return plotData
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
                        <Grid item xl={10} lg={10} md={10} sm={10} xs={10} >
                            <h2>Plot information for Plot #{this.state.plotNum}</h2>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2} >
                            <Button color="primary"
                                    onClick={()=> this.props.handleSaveData(this.getFormInfo())}>
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
                                        variant="outlined" value={this.state.certificate} 
                                        onChange={this.handleChange}/>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} sx={3}>
                            <TextField id="num-interred" name="numInterred" label="How Many Interred" 
                                        variant="outlined" value={this.state.numInterred}                            
                                        onChange={this.handleChange} />
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} sx={4} >
                            <TextField id="reserved-by" name="reservedBy" label="Reserved By" fullWidth={true}
                                        variant="outlined" value={this.state.reservedBy}                                         
                                        onChange={this.handleChange} />
                        </Grid>
                        <Grid item lg={2}>
                            <TextField id="reserved-date" name="reservedDate" label="Date of Reservation" 
                                        variant="outlined" value={this.state.reservedDate} 
                                        onChange={this.handleChange} />
                        </Grid>
                        <Grid item lg={2}>
                            <FileUploader />
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                            <TextField id="notes" name="notes" label="Notes" value={this.state.notes} 
                                        variant="outlined" fullWidth={true} multiline rows={4} 
                                        onChange={this.handleChange} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Spacer height={20} />
                    {this.state.interred.map((person, index) => {
                        return (<AdminInterredPerson key={index}
                            person={person}
                            index={index}
                            handleChange={this.handleArrayChange}
                            handleDateChange={this.handleDateChange}
                        /> )
                    })}       
                    <Divider />
                    <Grid>
                        {(this.state.interred.length < 3) ? 
                        <Button color="primary" onClick={() => this.props.handleShowNewPersonForm()}>
                            Add a Person
                        </Button>    
                        :
                        <div></div> }
                    </Grid>   
                </Container>
               )}
            </div>
    )}
}

export default PlotEditor