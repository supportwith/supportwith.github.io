import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import EtherComponent from './components/ether/EtherComponent';
import Get from './components/Get';
import Splash from './components/Splash'


class App extends Component {

  render() {
    return (
      <div className="App">
      <Switch>
        <Route path="/" exact component={Splash}/>
        <Route path="/get" component={Get}/>
        <Route path="/ether/:address" component={EtherComponent}/>
        <Redirect from="/ether" exact to="/get"/>
        <Route component={Splash}/>
      </Switch>
      </div>
    );
  }
}

export default App;
