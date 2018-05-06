import React from 'react';
import { Link } from 'react-router-dom';
import ether from '../resources/ether.png';


export default (match) => {
  return(
    <div className="splash">
      <p>
        Get support for your work directly from the frontpage of your project
      </p>
      <div className="get-crypto">
        <img className="crypto-logo" src={ether} alt="Ether" />
        <div className="text-wrap">
          <Link to="/get">Accept Ether</Link>
        </div>
      </div>
    </div>
  )
}
