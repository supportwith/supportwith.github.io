import React, { Component, Button } from 'react';
import { Link } from 'react-router-dom';


export default (match) => {
  return(
    <div>
      <h1>Accept crypto donations for your open source projects!</h1>
      <Link to="/get">Get Started</Link>
    </div>
  )
}
