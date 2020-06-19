import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import MainWindow from './components/Main'
import './App.css';



class App extends Component {
state = {
    data: null
  };

  

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
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

  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/">
          <MainWindow>
            
          </MainWindow>
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
        <p className="App-intro">{this.state.data}</p>
    </Switch></Router>
    )}
}

export default App;