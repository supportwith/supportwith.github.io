import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var Web3 = require('web3');



export default class Get extends Component {
    constructor(props) {
      super(props);
      this.state = {address: '', valid: false, msg: ''};
      this.updateAddress = this.updateAddress.bind(this);
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

      return (
        <div>
          <div>
            <p>Get support for your work with your own SupportWith badge</p>
              <label>
                Please enter your public <strong>ether address</strong> below.
              </label>
            <div>
              <input
                id="etheraddress"
                type="text"
                style={{width: "80%"}}
                value={this.state.address}
                onChange={this.updateAddress}
                required
              />
              <Link to={"/get/" + this.state.address}><button disabled={!this.state.valid}>Go</button></Link>
            </div>
          </div>
        </div>
      )
    }
}
