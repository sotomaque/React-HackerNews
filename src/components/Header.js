import React from "react";
import { Link } from 'react-router-dom';
import { FirebaseContext } from "../firebase";

function Header() {

  const { user, firebase } = React.useContext(FirebaseContext);

  return (
    <div className='header'>
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
        {
          user && (
            <>
              <div className='divider'>|</div>
              <Link to='/create' className='header-title'>
                Submit
              </Link>
            </>
          )
        }
        
      </div>
      <div className='flex'>
        {
          user ? (
            <>  
              <div className='header-name'>{user.displayName}</div>
              <div className='divider'>|</div>
              <div className='header-button' onClick={() => firebase.logout()}>Logout</div>
            </>
          ) : (
            <Link to='/login' className='header-title'>
              Login
            </Link>
          )
        }
      </div>
    </div>
  );
}

export default Header;
