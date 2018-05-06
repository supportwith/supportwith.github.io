import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { verifications as etherVerifications } from './ether/verifications';

export default class ListButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.match.params.address,
    }
    this.state.isVerified = (this.state.address in etherVerifications);
    this.state.user = (this.state.isVerified) ? etherVerifications[this.state.address].user : undefined;
    this.state.website = (this.state.isVerified) ? etherVerifications[this.state.address].website : undefined;
    this.getLinkToImage = this.getLinkToImage.bind(this);
    this.getMarkdown = this.getMarkdown.bind(this);
    this.getButton = this.getButton.bind(this);
    this.alreadyVerified = this.alreadyVerified.bind(this);
  }

  getLinkToImage() {
    let url = "https://img.shields.io/badge/Support%20"
    if (this.state.user)
       url += this.state.user + "%20"
    url += "with-ETH-green.svg"
    return url
  }

  getMarkdown() {
    let redirect = "https://supportwith.github.io/ether/" + this.state.address
    let markdown = "[![Supportwith-Ether Badge]"
    markdown += this.getLinkToImage()
    markdown += "](" + redirect + ")"
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
        Click <a href="https://github.com/supportwith/supportwith.github.io/edit/source/supportwith/src/components/ether/verifications.js"> here </a> to get verified!
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
