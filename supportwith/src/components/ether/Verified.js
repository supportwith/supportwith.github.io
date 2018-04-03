import React, { Component } from 'react';

export default class Verified extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 0.1, success: undefined}
    this.metaMaskTx = this.metaMaskTx.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  metaMaskTx() {
    this.props.web3.eth.net.getId()
      .then(netId => {
        if (netId !== "1")
          throw "Please swith to mainnet";
      })
      .then(() => this.props.web3.eth.getAccounts())
      .then((accounts) => {
        return this.props.web3.eth.sendTransaction({
          from: accounts[0],
          to: this.props.address,
          value: this.value,
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
    return (
      <div>
        <div>

          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <svg fill="#FFFFFF" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="green"/>
            </svg>
            <h1>
            <a href={this.props.verif.website}>{this.props.verif.user}</a> is verified with SupportWith!
            </h1>
          </div>

          <input
            type="number"
            value={this.state.value}
            onChange={this.handleChange}
            step={0.05}
            />
          <button
            onClick={this.metaMaskTx}
            disabled={this.props.web3 == null}
            >
            Support {this.props.verif.user} with MetaMask
          </button>
          {getMyEtherWallet(this.props.address, this.state.value, this.props.verif)}
          {getMyCrypto(this.props.address, this.state.value, this.props.verif)}
        </div>
        <div>
        {(this.state.success === 2) ? "Success!" : ""}
        {(this.state.success === 1) ? "Something went wrong": ""}
        </div>
      </div>
    )
  }
}

const getMyEtherWallet = (address, value, verif) => {
  let href = "https://www.myetherwallet.com/?to=" + address + "&value=" + value +"&#send-transaction"
  return (
    <a href={href}>
      <button>Support {verif.user} with MyEtherWallet</button>
    </a>
  )
}

const getMyCrypto = (address, value, verif) => {
  let href = "https://www.mycrypto.com/?to=" + address + "&value=" + value +"&#send-transaction"
  return (
    <a href={href}><button>Support {verif.user} with MyCrypto</button></a>
  )
}
