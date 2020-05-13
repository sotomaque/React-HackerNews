import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return <div className='header'>
    <div className='flex'>
      <img src='/logo.png' alt='logo' className='logo' />
      <div className='divider'>|</div>
      <Link to='/' className='header-title'>
        Hooks News
      </Link>
      <div className='divider'>|</div>
      <Link to='/' className='header-title'>
        New
      </Link>
      <div className='divider'>|</div>
      <Link to='/top' className='header-title'>
        Top
      </Link>
      <div className='divider'>|</div>
      <Link to='/search' className='header-title'>
        Search
      </Link>
      <div className='divider'>|</div>
      <Link to='/create' className='header-title'>
        Submit
      </Link>
    </div>
    <div className='flex'>
      <Link to='/login' className='header-title'>
        Login
      </Link>
    </div>
  </div>;
}

export default Header;
