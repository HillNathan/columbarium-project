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
        {/* Use out searchBy flag to show a different title based on what we are searching for */}
        {this.state.searchBy === "PLOT" ? 
          <DialogTitle id="alert-dialog-slide-title">Search for a Plot Number</DialogTitle>
        :
          <DialogTitle id="alert-dialog-slide-title">Search Plots by Name</DialogTitle>
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                Enter a {this.state.searchBy === "PLOT" ? <span>Plot # </span> : <span>Name </span>} 
                to search for.
          </DialogContentText>
          <TextField
                  autoFocus
                  margin="dense"
                  id="plot-search-term"
                  label="search"
                  type="text"
                  fullWidth
                />
        </DialogContent>
        <DialogActions>
        {this.state.searchBy === "PLOT" ? 
          <Button onClick={() => this.props.handlePlotSearch(document.getElementById("plot-search-term").value)} color="primary">
            Search
          </Button>
        :
        <Button onClick={() => this.props.handleClose()} color="primary">
          Search
        </Button>
      }
          <Button onClick={() => this.props.handleClose()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}}

export default SearchDialogSlide