import React, { Component } from 'react';
import {verifications} from './ether/verifications'

function getLinkToImage(user) {
  let url = "https://img.shields.io/badge/Support%20"
  if (user)
     url += user + "%20"
  url += "with-ETH-green.svg"
  return url
}


const Button = ({match}) => {
  let address = match.params.address;
  if (address in verifications) {
    window.location = getLinkToImage(verifications[address].user)
  }
  window.location = getLinkToImage(undefined)
}

export default Button;
