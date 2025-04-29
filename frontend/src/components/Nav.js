import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Nav() {
  return (
    <div>
      <div className='h-20 bg-neutral-950'></div>
      <nav className="fixed top-0 nav flex w-full items-center justify-between text-neutral-300 h-20 px-4 bg-neutral-950 z-40">
        <Link to="/">
          <img src={logo} className="px-2 w-44" alt="Logo" />
        </Link>
        <ul className="md:flex items-center left-1/2 -translate-x-1/2 gap-8 text-xl hidden">
          <li>
            <Link 
              to='/services' 
              className="text-[#FFD449] font-bold text-1xl tracking-tight" 
              style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}>
              Services
            </Link>
          </li>
          <li>
            <Link 
              to='/about' 
              className="text-[#FFD449] font-bold text-1xl tracking-tight" 
              style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}>
              About
            </Link>
          </li>
          <li>
            <Link 
              to='/team' 
              className="text-[#FFD449] font-bold text-1xl tracking-tight" 
              style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}>
              Our Team
            </Link>
          </li>
          <li>
            <Link 
              to='/contact' 
              className="text-[#FFD449] font-bold text-1xl tracking-tight" 
              style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;