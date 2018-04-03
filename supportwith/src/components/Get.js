import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var Web3 = require('web3');


export default class Get extends Component {
    constructor(props) {
      super(props);
      this.state = {address: '', valid: false, msg: ''};
      this.updateAddress = this.updateAddress.bind(this)
    }

    updateAddress(event) {
      let address = event.target.value;
      if (!Web3.utils.isAddress(address)) {
        return this.setState({address: address, valid: false, msg: "Not a valid address"})
      } else if (!address.startsWith("0x")) {
        return this.setState({address: address, valid: false, msg: "Please include 0x-prefix in ether address"})
      }
      this.setState({address: address, valid: true})
    }

    render() {
      let url = "https://supportwith.github.io/ether/" + this.state.address
      let markdown = "[![Supportwith-Ether Badge]" +
                      "(https://img.shields.io/badge/Support%20with-ETH-green.svg)" +
                      "](" + url + ")"
      let mdiv = (
        <div>
          <h3>Markdown</h3>
          {markdown}
          <Link to={{pathname: "/ether/" + this.state.address}}>
            <img src={"https://img.shields.io/badge/Support%20with-ETH-green.svg"}/>
          </Link>
        </div>
      )
      return (
        <div>
          <h1>Get support for your work with your own Support With badge</h1>
          <label>
            Ether address
          </label>
          <input
            type="text"
            value={this.state.address}
            onChange={this.updateAddress}
          />
          {(this.state.valid) ? mdiv : this.state.msg}
        </div>
      )
    }
}
