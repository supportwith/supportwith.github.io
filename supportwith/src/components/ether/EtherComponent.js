import React, { Component } from 'react';
import { verifications as etherVerifications} from './verifications';
var Web3 = require('web3');
var toWei = require('web3').utils.toWei;



export default class Verified extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0.1,
      success: undefined,
      address: this.props.match.params.address,
      isVerified: undefined,
      user: undefined,
      website: undefined
    }

    this.metaMaskTx = this.metaMaskTx.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.web3 = null;

  }

  componentWillMount() {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    }
    etherVerifications()
      .then(v => {
        let isVerified = (this.state.address in v);
        let user = (isVerified) ? v[this.state.address].user : undefined;
        let website = (isVerified) ? v[this.state.address].website : undefined;

        this.setState({
          isVerified, user, website
        })
      })




  }

  metaMaskTx() {
    this.web3.eth.net.getId()
      .then(netId => {
        if (netId !== 1)
          throw "Please swith to mainnet";
      })
      .then(() => this.web3.eth.getAccounts())
      .then((accounts) => {
        return this.web3.eth.sendTransaction({
          from: accounts[0],
          to: this.state.address,
          value: toWei(this.state.value.toString(), 'ether'),
        })
      })
      .then(() => this.setState({success: true}))
      .catch((err) => {
        console.log(err)
        return this.setState({success: false})
      });
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }


  render() {
    let message = (this.state.isVerified)
      ? (
        <div>
          You are supporting <a href={this.state.website}>{this.state.user}</a>.
          This <a href={"https://www.etherscan.io/address/" + this.state.address}>address</a> is verified with SupportWith.
        </div>
      )
      : (
        <div>
        You are supporting <a href={"https://www.etherscan.io/address/" + this.state.address}> {this.state.address}</a>.
        Please exercise caution; This address is <strong> not </strong> verified with SupportWith
        </div>
      )

    return (
      <div className="transaction">
          {message}
        <div className="formContainer">
          <div className="left">
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
              step={0.05}
              />
          </div>
          <div className="right">
            <button
              onClick={this.metaMaskTx}
              disabled={this.web3 == null}
              >Support {this.state.user} with MetaMask</button>
            {getMyEtherWallet(this.state.address, this.state.value, this.state.user)}
            {getMyCrypto(this.props.address, this.state.value, this.state.user)}
          </div>
        </div>
        <div>
        {(this.state.success === 2) ? "Success!" : ""}
        {(this.state.success === 1) ? "Something went wrong": ""}
        {(!this.state.isVerified) ? "If this address belongs to you, consider getting verified" : ""}
        </div>
      </div>
    )
  }
}

const getMyEtherWallet = (address, value, user) => {
  let href = "https://www.myetherwallet.com/?to=" + address + "&value=" + value +"&#send-transaction"
  return (
    <a href={href}>
      <button>Support {user} with MyEtherWallet</button>
    </a>
  )
}

const getMyCrypto = (address, value, user) => {
  let href = "https://www.mycrypto.com/?to=" + address + "&value=" + value +"&#send-transaction"
  return (
    <a href={href}><button>Support {user} with MyCrypto</button></a>
  )
}
