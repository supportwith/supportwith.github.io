import React from 'react';
import check from '../resources/check.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="text-wrap">
          <Link to="/">
            <img className="logo-img" src={check} alt="SupportWith"/>
          </Link>
        </div>
        <div className="logo-wrap">
          <div className="text-wrap">
            <div className="logo-text">
            SupportWith
            </div>
          </div>
          <div className="text-wrap">
            Accept crypto donations for your projects
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
