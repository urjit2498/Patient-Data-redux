import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar bg-dark'>
        <a href='/'>GreyCell Labs.</a>
        <ul>
          <li>
            <Link to='/'>Admit Form</Link>
          </li>
          <li>
            <Link to='/chart'>Chart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
