import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// bringing in a custom component 
import InterredListItem from '../InterredListItem';

//==================================================================================================
// Set our transition style and direction for how the dialog box appears
//==================================================================================================
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AlertDialogSlide extends Component {
  constructor() {
      super();
      
      this.state = {
          open: false,
          status: "",
          name: null,
          interred: [],
          plot: "",
          picture: "",
          button: "",
      }
  }

  //==============================================================================================
  // Taking information from props and placing that data into our local state 
  //==============================================================================================
  componentWillReceiveProps (incomingProps) {
      this.setState({ 
          open: incomingProps.showMe,
          plot: incomingProps.infoToShow.plot,
          name: incomingProps.infoToShow.reservedBy,
          picture: incomingProps.infoToShow.picture,
          interred: incomingProps.infoToShow.interred,
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
          { 
          // We only want to try to display a picture for those records that have one, so setting up this 
          //   operator so that we only try to display a picture where there is information in that key. 
          (this.state.picture !== "") ? 
          <img src={"./images/" + this.state.picture} 
               style={{height: 300, width: 300}}
               alt={"Picture of Plot Number " + this.state.plot}/>
          :
          <div></div>
          }
          <DialogContentText id="alert-dialog-slide-description">
                Current plot status: {this.state.status}
                {(this.state.status === "OCCUPIED") ? 
                    <ul>
                    { // iterating over each person in the interred array to display them using a 
                    //     cusom component. 
                    this.state.interred.map(person => <InterredListItem person={person} /> )}</ul>
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