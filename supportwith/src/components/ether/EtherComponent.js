import React, { Component } from 'react';
import { verifications } from './verifications';
import Verified from './Verified';
import Unverified from './Unverified';
var Web3 = require('web3');

class EtherComponent extends Component {

  constructor(props) {
    super(props);
    this.address = this.props.match.params.address;
    this.web3 = null;
  }

  componentWillMount() {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    }
  }

  render() {
    let Component = (this.address in verifications) ? Verified : Unverified
    return (<Component web3={this.web3} address={this.address} verif={verifications[this.address]}/>)
  }
}


export default EtherComponent;
