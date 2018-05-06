import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import EtherComponent from './components/ether/EtherComponent';
import Get from './components/Get';
import ListButtons from './components/ListButtons';
import Splash from './components/Splash'
import Header from './components/Header.js';
import Footer from './components/Footer.js';


class App extends Component {

  render() {
    return (
      <div className="center">
        <div className="container">
          <Header />
          <div className="content">
            <Switch>
              <Route path="/" exact component={Splash}/>
              <Route path="/get/:address" component={ListButtons}/>
              <Route path="/get" component={Get}/>
              <Route path="/ether/:address" component={EtherComponent}/>
              <Redirect from="/ether" exact to="/get"/>
              <Route component={Splash}/>
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
