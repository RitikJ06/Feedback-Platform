import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userImg from './../../images/user-image.png'
import './NavBar.css'

export default function NavBar(props) {
  const [name, setName] = useState();
  const [data, setData] = useState({jwtToken: false});

  
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('data'));
    if(!userData){
      userData = {jwtToken : false};
    }
    setData(userData);
    setName(userData.name);
  }, [])

  return (
    <div className='headerBlock'>
      <h2>Feedback</h2>
      <div className='navItemsWrapper'>
        { !data.jwtToken ? 
            <>
            <Link to="/login" className='navLoginButton'>Log in</Link>
            <Link to="/signup" className='navSignupButton'>Sign up</Link>
            </>
          :
            <>
              <Link to='/login' className='logoutButton' onClick={() => {localStorage.removeItem('data');}}>Logout</Link>
              <span className='userName'>Hello {name}</span>
              <img className='userImage' src={userImg} alt='use icon' />
            </>
        }
      </div>
    </div>
  )
}
