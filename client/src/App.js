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
import SearchDialogSlide from './components/SearchDialog'
import MessageDialog from './components/MessageDialog'
import NameSearchResults from './components/NameSearchResults'
import NewPersonForm from './components/AdminNewPersonForm'

import './App.css'

const API = require('./functions')

// setting up a variable that matches the 'activeRecord' key in state to make it easier to 
//  clear it out when we're done displaying it in the Dialog box. 
const emptyInfo = { id: 0, status: "" , plot: 0, name: ""}

class App extends Component {
state = {
    plotMap: [],
    showPlotDialog: false,
    showSearchDialog: false,
    searchBy: "",
    showMessageDialog: false,
    messageDialogheader: "",
    messageDialogText: "",
    messageDialogReferrer: "",
    showNamesearchResults: false,
    nameSearchResultsList: [],
    activeRecord: {
      id: 0,
      plot: 0,
      status: "",
      reservedBy: "",
      certificate: 0,
      reservedDate: "",
      numInterred: 0,
      notes: "",
      interred: []
    },
    adminActivePage: "PLOT",
    adminActivePlot: 0,
    showNewPersonForm: false,
  }

  componentDidMount() {
    // Fetches our initial plot map array from the server
    this.callGetPlotMap()
    .then (response => {
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

    theArray.forEach(item => {
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

  callGetPlotMap = async () => {
    // This is the actual GET route to hit the server and send the data to be processed. 
    const data = await API.getAllPlots()
      return data;
  }

  handlePlotDialogOpen = plotID => {
    // receives a plot ID to be displayed, fetches the plot info from the database, and then 
    //  stores that into in state to be displayed by the plot dialog
    //==============================================================================================

    // First, we need to make sure the other Dialog boxes that could potentially send us here are closed
    this.handleSearchDialogClose()
    this.handleNameSearchClose()

    API.getOnePlot( plotID )
    .then(plotData => {
      // once we have the plot information, put the info we need into state and set the display
      // variable for the plot dialog box to be active
      if (plotData.status===200) {
        this.setState({ 
          showPlotDialog: true,
          activeRecord: {
            id: plotData.data.data.plot.id,
            plot: plotData.data.data.plot.plotNumber,
            status: plotData.data.data.plot.status,
            reservedBy: plotData.data.data.plot.reservedBy,
            certificate: plotData.data.data.plot.certificate,
            reservedDate: plotData.data.data.plot.reservedDate,
            numInterred: plotData.data.data.plot.numInterred,
            notes: plotData.data.data.plot.notes,
            interred: plotData.data.data.interred,
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

  handleSearchDialogOpen = searchBy => {
    this.setState({
      showSearchDialog: true,
      searchBy: searchBy
    })
  }

  handleSearchDialogClose = () => {
    // sets the flag in state to stop showing the search box, and clears out the info from state. 
    this.setState({ 
      showSearchDialog: false,
      searchBy: "",
      })
    // then we need to empty all the values from the search dialog box for the next time we open it.
  }

  handleNameSearch = searchObj => {
    this.setState({ 
      showSearchDialog: false,
      searchBy: "",
      })

    API.doNameSearch( searchObj )
    .then(response => {
      // console.log(response.data)
      this.setState({
        showNamesearchResults: true,
        nameSearchResultsList: response.data.data
      })
    })
  }

  handleNameSearchClose = () => {
    this.setState({
      showNamesearchResults: false,
      nameSearchResultsList: []
    })

  }

  handleMessageDialogOpen = (header, message, referrer) => {
    // referrer is here to be able to re-open a different dialog box once the user closes the 
    //  message box, since wer are closing the other dialog boxes in order to show the message 
    //  box.

    // close the other dialog boxes....
    this.handleSearchDialogClose()
    this.closePersonForm()

    // set the state to display the message box with the appropriate information. 
    this.setState({
      showMessageDialog: true,
      messageDialogheader: header,
      messageDialogText: message,
      messageDialogReferrer: referrer
    })
  }

  handleMessageDialogClose = () => {
    // here is where we check referrer, and open another dialog box if appropriate. 
    if (this.state.messageDialogReferrer !== ""){
      switch (this.state.messageDialogReferrer) {
        case "PLOT" : 
            this.handleSearchDialogOpen("PLOT")
            break
        case "NAME" : 
          this.handleSearchDialogOpen("NAME")
          break
        case "ADMIN" : 
          this.handleShowNewPersonForm()
          break
        default :
          // do nothing, no need to open another dialog box
      }
    }
    this.setState({
        showMessageDialog: false,
        messageDialogheader: "",
        messageDialogText: "",
        messageDialogReferrer: ""

      })
  }

  handleAdminMenuClick = button => {
    // if the input is "GRID" we will redirect the user to the main page with the plot map
    if (button === "GRID") {
      window.location = "/";
    }
    else {
      // if not "GRID" button will either equal "PLOT" or "USERS" because we control the input to this function.
      this.setState({ adminActivePage: button })
    }
  }

  handleAdminSaveClick = (plotObj) => {
    API.updateOnePlot(plotObj.plot)
    .then (updatedRecord => {
      plotObj.interredArray.forEach(person => {
        if(person.id) API.updateOnePerson(person)
        else API.addPerson(person)
      })
    })
  }

  handleAdminPlotSearch = thePlot => {
    // this will handle the search feature of the admin plot editor
    if ( isNaN(parseInt(thePlot)) ) {
      alert("please enter numbers only.")
    }
    else if ( parseInt(thePlot) < 837 && parseInt(thePlot) > 0) {
      API.getOnePlot(thePlot)
      .then(plotData => {
        this.setState({
          adminActivePlot: thePlot,
          activeRecord: {
            id: plotData.data.data.plot.id,
            plot: plotData.data.data.plot.plotNumber,
            status: plotData.data.data.plot.status,
            reservedBy: plotData.data.data.plot.reservedBy,
            certificate: plotData.data.data.plot.certificate,
            reservedDate: plotData.data.data.plot.reservedDate,
            numInterred: plotData.data.data.plot.numInterred,
            notes: plotData.data.data.plot.notes,
            interred: plotData.data.data.interred,
          }
        })
      })
    }
    else {
      alert("please enter a valid plot number.")
    }
    document.getElementById('plot-search-id').value = null
  }

  handleShowNewPersonForm = () => {
    this.setState({
        showNewPersonForm : true,
    })
}

  addNewPersonToPlot = (newPerson) => {
    this.closePersonForm()
    console.log(newPerson)
    var tempObj = this.state.activeRecord
    tempObj.interred.push(newPerson)
    this.setState({
      activeRecord: tempObj
    })
    document.getElementById("salutation-new").value = ""
    document.getElementById("first-name-new").value = ""
    document.getElementById("middle-name-new").value = ""
    document.getElementById("last-name-new").value = ""
    document.getElementById("suffix-new").value = ""
    document.getElementById("dob-new").value = ""
    document.getElementById("dod-new").value = ""

  }

  closePersonForm = () => {
    this.setState({
        showNewPersonForm: false,
    })
}

  render() {
    return (
      <div>
      <Router>
        <Switch>
        <Route exact path="/">
          <MainWindow
            plotList={this.state.plotMap}
            handleOpen={this.handlePlotDialogOpen}
            handleSearchOpen={this.handleSearchDialogOpen}
          />
          <PlotDialog
            showMe={this.state.showPlotDialog}
            infoToShow={this.state.activeRecord}
            handleClose={this.handlePlotDialogClose} 
          />  
          <SearchDialogSlide
            showMe={this.state.showSearchDialog}
            searchBy={this.state.searchBy} 
            handleClose={this.handleSearchDialogClose}
            handlePlotSearch={this.handlePlotDialogOpen}
            handleNameSearch={this.handleNameSearch}
            messageBoxOpen={this.handleMessageDialogOpen}
          />
          <NameSearchResults 
            showMe={this.state.showNamesearchResults}
            results={this.state.nameSearchResultsList}
            handleClose={this.handleNameSearchClose}
            searchResultClick={this.handlePlotDialogOpen}
          />
        </Route>
        <Route exact path="/login">
          <LoginWindow />
        </Route>
        <Route exact path="/admin">
          <AdminWindow 
            handleMenuClick={this.handleAdminMenuClick}
            handleSaveData={this.handleAdminSaveClick}
            handleAdminSearch={this.handleAdminPlotSearch}
            activePage={this.state.adminActivePage} 
            plot={this.state.adminActivePlot}
            plotData={this.state.activeRecord}
            handleShowNewPersonForm={this.handleShowNewPersonForm}
          />
        <NewPersonForm 
          showMe={this.state.showNewPersonForm}
          handleAddClick={this.addNewPersonToPlot}
          handleClose={this.closePersonForm}
          plot={this.state.activeRecord.plot}
          messageBoxOpen={this.handleMessageDialogOpen}
          />
        </Route>
    </Switch></Router>
      <MessageDialog 
        showMe={this.state.showMessageDialog}
        header={this.state.messageDialogheader}
        message={this.state.messageDialogText}
        handleClose={this.handleMessageDialogClose}
    />
    </div>
    )}
}

export default App;