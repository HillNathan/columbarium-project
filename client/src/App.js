import React, { Component } from 'react'
// import our important React components to use react as our router
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
// bringing in our user-defined components
import MainWindow from './pages/Main'
import AdminWindow from './pages/Admin'
import LoginWindow from './pages/Login'
import PlotDialog from './components/PlotDialog'
import './App.css'

const API = require('./functions')

// setting up a variable that matches the 'activeRecord' key in state to make it easier to 
//  clear it out when we're done displaying it in the Dialog box. 
const emptyInfo = { id: 0, status: "" , plot: 0, name: ""}

class App extends Component {
state = {
    data: null,
    plotMap: [],
    showPlotDialog: false,
    activeRecord: {
      id: 0,
      plot: 0,
      status: "",
      name: ""
    },
  }

  componentDidMount() {
    // Fetches our initial plot map array from the server
    this.callGetTempDB()
    .then (response => {
      console.log(response.data.tempDB)
        // once we have the data from the server, we need to format it into an array of arrays
        //  so that it can be displayed for our plot map
        this.massage(response.data.tempDB)
        .then ( looseData => {
          // once our data is set up how we need it, se set it into state so that it can be displayed
          this.setState({ plotMap: looseData.reverse()})
        })
    })
  }

  massage = async theArray => {
    // create two empty arrays. One will hold the array of arrays that will eventually make up 
    //  our map, the other will be a temporary container to hold the plots as they are put into
    //  the arrays to make up each row.
    var tempArray = []
    var arrayRow = []

    theArray.map(item => {
        // add the item to the row array
        arrayRow.push(item)
        if (item.id % 22 === 0) {
            // if we are at 22 items in that array, then add it to our array of arrays and clear it out
            //  to start the next one. 
            tempArray.push(arrayRow.reverse())
            arrayRow = []
        }
    })
    // return our completed array of arrays
    return tempArray;
  }

  // This is the actual fetch route to hit the server and send the data to be processed. 
  callGetTempDB = async () => {
    // const response = await fetch('/api/getplots');
    // const body = await response.json();

    const data = await API.getAllPlots()
      console.log(data.data)
      return data;

    // if (response.status !== 200) {
    //   throw Error(body.message) 
    // }
  }

  handlePlotDialogOpen = (plotID) => {
    // receives a plot ID to be displayed, fetches the plot info from the database, and then 
    //  stores that into in state to be displayed by the plot dialog
    API.getOnePlot( plotID )
    .then(plotData => {
      // once we have the plot information, put the info we need into state and set the display
      // variable for the plot dialog box to be active
      console.log(plotData)
      if (plotData.status===200) {
        this.setState({ 
          showPlotDialog: true,
          activeRecord: {
            id: plotData.data.data.id,
            plot: plotData.data.data.plot_number,
            status: plotData.data.data.status,
            name: plotData.data.data.reserved_by
          }
        }) 
      }
      else {
        this.setState({
          activeRecord: { name: "There was an error." } 
        })
      }
    })
  }

  handlePlotDialogClose = () => {
    // sets the flag in state to stop showing the dialog box, and clears out the info from state. 
    this.setState({ 
      showPlotDialog: false,
      plotDialogInfo: emptyInfo
      })
  }

  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/">
          <MainWindow
            plotList={this.state.plotMap}
            handleOpen={this.handlePlotDialogOpen}
          />
          <PlotDialog
            showMe={this.state.showPlotDialog}
            infoToShow={this.state.activeRecord}
            handleClose={this.handlePlotDialogClose} />  
        </Route>
        <Route exact path="/login">
          <LoginWindow />
        </Route>
        <Route exact path="/admin">
          <AdminWindow />
        </Route>
    </Switch></Router>
    )}
}

export default App;