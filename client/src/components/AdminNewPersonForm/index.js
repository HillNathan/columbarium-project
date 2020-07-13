import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Spacer from '../WideSpacer'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class NewPersonForm extends Component {
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

    componentWillReceiveProps (incomingProps) {
        this.setState({ 
            open: incomingProps.showMe,
            plotId: incomingProps.plot,
        })
    }

    handleChange(event) {
        let { name, value } = event.target;
    
        this.setState({
          [name]: value
        });
    }

    handleSave() {
        this.setState({
            salutation: "",
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            dateOfBirth: "",
            dateOfDeath: "",
        })
        this.props.handleAddClick(this.state)
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