import React from 'react';
import check from '../resources/check.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="text-wrap">
          <img className="logo-img" src={check} alt="SupportWith"/>
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
