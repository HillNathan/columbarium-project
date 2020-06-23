import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AlertDialogSlide extends Component {
    constructor() {
        super();
        
        this.state = {
            open: false,
            status: "",
            name: "",
            plot: "",
            button: "",
        }
    }

    handleClickOpen = () => {
        this.setState({ open:true });
    };

    componentWillReceiveProps (incomingProps) {
        this.setState({ 
            open: incomingProps.showMe,
            plot: incomingProps.infoToShow.plot,
            name: incomingProps.infoToShow.name,
            status: incomingProps.infoToShow.status})
    }
  
  render() {
  return (
    <div className="dialog-box">
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Information for Plot #{this.state.plot}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                Current plot status: {this.state.status}
                {(this.state.status === "OCCUPIED") ? 
                    <p>{this.state.name}</p>
                :
                    <span></span>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.handleClose()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}}

export default AlertDialogSlide