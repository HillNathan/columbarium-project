import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Spacer from '../WideSpacer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

//==================================================================================================
// Set our transition style and direction for how the dialog box appears
//==================================================================================================
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class NewPersonForm extends Component {
  //==================================================================================================
  // Displays a dialog box allowing the admin user to enter a new person into a plot record
  //==================================================================================================
    constructor() {
        super();
        
        this.state = {
            open: false,
            salutation: "",
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            dateOfBirth: "",
            dateOfDeath: "",
            plotId: 0,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open:true });
    };

    //==================================================================================================
    // When the component receives props from the parent component, we want some of them to be set into 
    //   our local state, so when we get them from the parent we put them into our local state using 
    //   this function. 
    //==================================================================================================
    componentWillReceiveProps (incomingProps) {
        this.setState({ 
            open: incomingProps.showMe,
            plotId: incomingProps.plot,
        })
    }

    //==================================================================================================
    //  Stock handleChange event here...
    //==================================================================================================
    handleChange(event) {
        let { name, value } = event.target;
    
        this.setState({
          [name]: value
        });
    }

    //==================================================================================================
    // This function will run the handler function to add the new person to the plot, and then
    //   clear the state so that an additional person can be added if necessary
    //==================================================================================================
    handleSave() {
      this.props.handleAddClick(this.state)
        this.setState({
            salutation: "",
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            dateOfBirth: "",
            dateOfDeath: "",
        })
    }

    render() {
        return(
            <div className="dialog-box">
            <Dialog
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">Add a Person to Plot #{this.state.plot}</DialogTitle>
              <DialogContent>

                <TextField id={"salutation-new"} label="Salutation" name="salutation" 
                            InputLabelprops={{ shrink: true, }} variant="outlined" 
                            onChange={this.handleChange} fullWidth
                            value={this.state.salutation} /> 
                <Spacer />
                <TextField id={"first-name-new"} label="First Name" name="firstName"
                            InputLabelprops={{ shrink: true, }} variant="outlined" 
                            onChange={this.handleChange} fullWidth
                            value={this.state.firstName} />
                <Spacer />
                <TextField id={"middle-name-new"} label="Middle Name" name="middleName"
                            InputLabelprops={{ shrink: true, }} variant="outlined" 
                            onChange={this.handleChange} fullWidth
                            value={this.state.middleName} />
                <Spacer />
                <TextField id={"last-name-new"} label="Last Name" name="lastName"
                            InputLabelprops={{ shrink: true, }} variant="outlined" 
                            onChange={this.handleChange} fullWidth
                            value={this.state.lastName} />
                <Spacer />
                <TextField id={"suffix-new"} label="Suffix" name="suffix" 
                            InputLabelprops={{ shrink: true, }} variant="outlined"
                            onChange={this.handleChange} fullWidth
                            value={this.state.suffix} />
                <Spacer />
                <TextField id={"dob-new"} label="Date of Birth" name="dateOfBirth" 
                            InputLabelprops={{ shrink: true, }} variant="outlined"
                            onChange={this.handleChange}  fullWidth
                            value={this.state.dateOfBirth} />
                <Spacer />
                <TextField id={"dod-new"} label="Date of Death" name="dateOfDeath" 
                            InputLabelprops={{ shrink: true, }} variant="outlined"
                            onChange={this.handleChange} fullWidth
                            value={this.state.dateOfDeath} />
            <Spacer />
            </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleSave()} color="primary">
            Add To Plot
          </Button>
          <Button onClick={() => this.props.handleClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
        )
    }


}

export default NewPersonForm