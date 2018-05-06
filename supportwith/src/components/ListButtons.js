import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { verifications as etherVerifications } from './ether/verifications';

export default class ListButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.match.params.address,
      isVerified: undefined,
      user: undefined,
      website: undefined
    }
    this.getLinkToImage = this.getLinkToImage.bind(this);
    this.getMarkdown = this.getMarkdown.bind(this);
    this.getButton = this.getButton.bind(this);
    this.alreadyVerified = this.alreadyVerified.bind(this);
  }

  componentWillMount() {
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

  getLinkToImage() {
    let url = "https://img.shields.io/badge/Support%20"
    if (this.state.user)
       url += this.state.user + "%20"
    url += "with-ETH-green.svg"
    return url
  }

  getMarkdown() {
    let redirect = process.env.PUBLIC_URL + this.state.address
    let markdown = "[![Supportwith-Ether Badge]("
    markdown += this.getLinkToImage()
    markdown += ")](" + redirect + ")"
    return markdown
  }

  getButton() {
    return(
      <Link to={"/ether/" + this.state.address} >
        <img alt="Accept Ethereum" onClick={this.onMarkdownClick} src={this.getLinkToImage()}/>
      </Link>
    )
  }

  getVerified() {
    return (
      <div>
        <p>
        We strongly recommend to verify this address.
        Click <a href="https://github.com/supportwith/supportwith.github.io/edit/master/ether.json"> here </a> to get verified!
        </p>
      </div>
    )
  }

  alreadyVerified() {
    return (
      <div>
        This address is already verified this address as <a href={this.state.website}>{this.state.user}</a>
      </div>
    )
  }

  render() {
    let {user} = this.state;
    let verifDiv = (user) ? this.alreadyVerified() : this.getVerified()

    return (
      <div>
        <div>
          <p>
          Your badge looks like:
          </p>
          {this.getButton()}
          <p>
          Click <CopyToClipboard text={this.getMarkdown()}><a href="#">here</a></CopyToClipboard> to copy the Markdown.
          </p>
        </div>
        {verifDiv}
      </div>
    )
  }
}
