import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to="/">Basic</Link>
        </li>
        <li>
          <Link to="/scientific">Scientific</Link>
        </li>
        <li>
          <Link to="/computer">Computer</Link>
        </li>
        <li>
          <Link to="/converter">Converter</Link>
        </li>
        <li>
          <Link to="/Interest">Interest</Link>
        </li>
        <li>
          <Link to="/currency">Currency</Link>

        </li>
        <li>
          <Link to="/area">Area</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar ;
