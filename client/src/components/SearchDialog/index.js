import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SearchDialogSlide extends Component {
    constructor() {
        super();
        
        this.state = {
            open: false,
            searchBy: ""
        }
    }

    handleClickOpen = () => {
        this.setState({ open:true });
    };

    componentWillReceiveProps (incomingProps) {
        this.setState({ 
            open: incomingProps.showMe,
            searchBy: incomingProps.searchBy })
    }

    validatePlotSearch = (searchTerm) => {
      // the way that i chose to handle the validation, we are checking to see if the searchTerm is a
      //  number, so by checking if it is NOT a number, then returning the opposite, we are saying that
      //  it is actually a number. I guess I could have just returned the value if isNaN but then the 
      //  validation function - to me - would have functioned backwards. 
      return !isNaN(parseInt(searchTerm))
    }

    handleSearchClick = () => {
      if(this.state.searchBy === "PLOT") {
        // put the plot search term into a variable for validation
        var searchTerm = document.getElementById("plot-search-term").value.trim()

        // validate the input
        if (this.validatePlotSearch(searchTerm)) {  
          // since we have valid input, we hit the appropriate search function        
          this.props.handlePlotSearch(searchTerm)
        }
        else {
          // alert the user that their input needs to be a number
          this.props.messageBoxOpen(
            "Error...",                                   // header
            "You must enter a number to search by plot.", // message
            "PLOT")                                       // referrer
        }
        document.getElementById("plot-search-term").value = null
      }
      else{
        // gather the relevant data into an object
        var searchObj = {}
        searchObj.firstName = document.getElementById("searchFirstName").value
        searchObj.lastName = document.getElementById("searchLastName").value
        // run function from App.js here to hit the search route
        this.props.handleNameSearch(searchObj)

        //clear out the search fields. 
        document.getElementById("searchFirstName").value = null
        document.getElementById("searchLastName").value = null
      }
    }
  
  render() {
  return (
    <div className="dialog-box">
      {this.state.searchBy === "PLOT" ? 
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">Search for a Plot Number</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                Enter a Plot Number to search for.
          </DialogContentText>
          <TextField
                  autoFocus
                  margin="dense"
                  id="plot-search-term"
                  label="Plot Number"
                  type="text"
                  fullWidth
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleSearchClick()} color="primary">
            Search
          </Button>
          <Button onClick={() => this.props.handleClose()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    :
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <DialogTitle id="alert-dialog-slide-title">Search for a Name</DialogTitle>
      <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
            Enter a Name to search for.
            <p>You may enter a first name, last name, or both.</p>
      </DialogContentText>
      <TextField
              autoFocus
              margin="dense"
              id="searchFirstName"
              label="First Name"
              type="text"
              fullWidth
            />
      <TextField
              autoFocus
              margin="dense"
              id="searchLastName"
              label="Last Name"
              type="text"
              fullWidth
            />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => this.handleSearchClick()} color="primary">
          Search
        </Button>
        <Button onClick={() => this.props.handleClose()} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  }
    </div>
  );
}}

export default SearchDialogSlide