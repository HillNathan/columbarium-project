import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import MainWindow from './pages/Main'
import PlotDialog from './components/PlotDialog'
import './App.css';

const emptyInfo = { ID: 0, status: "" }

class App extends Component {
state = {
    data: null,
    plotMap: [],
    showPlotDialog: false,
    plotDialogInfo: {
      ID: 0,
      status: "",
      name: ""
    },
  };

  

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));

    this.callGetTempDB()
      .then(res => this.setState({ plotMap: res.tempDB.reverse()}))
      .catch(err => console.log(err));

  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  callGetTempDB = async () => {
    const response = await fetch('/get_temp_db');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }

  handlePlotDialogOpen = (infoToDisplay) => {
    this.setState({ 
      showPlotDialog: true,
      plotDialogInfo: infoToDisplay
     })
  }


  handlePlotDialogClose = () => {
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
            infoToShow={this.state.plotDialogInfo}
            handleClose={this.handlePlotDialogClose} />  
        </Route>
        <Route exact path="/login">
          <div className="Login">
            <header className="App-header">
              <h1 classname="App-title">Admin Login Screen</h1>
            </header>
            <p className="App-intro">{this.state.data}</p>
          </div>
        </Route>
        <Route exact path="/admin">
          <div className="Login">
            <header className="App-header">
              <h1 classname="App-title">Admin Screen</h1>
              <h2>This route will be protected.</h2>
            </header>
            <p className="App-intro">{this.state.data}</p>
          </div>
        </Route>
    </Switch></Router>
    )}
}

export default App;