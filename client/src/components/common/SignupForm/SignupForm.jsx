import React from 'react'
import './SignupForm.css'
import { useRef } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import userIcon from './../../../images/user_icon.svg'
import emailIcon from './../../../images/email_icon.svg'
import passIcon from './../../../images/password_icon.svg'
import mobileIcon from './../../../images/mobile_icon.svg'

export default function SignupForm() {
  const nameRef = useRef()
  const emailRef = useRef()
  const mobileRef = useRef()
  const passwordRef = useRef()
  const errRef = useRef();
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault()
        let res = await axios.post( 'http://localhost:8000/register', {
          name: nameRef.current.value,
          email: emailRef.current.value,
          mobile: mobileRef.current.value,
          password: passwordRef.current.value
        })

        if(res.data.status === 200){
          console.log(res.data.name)
          localStorage.setItem('data', JSON.stringify({name: res.data.name, jwtToken: res.data.jwtToken}));
          navigate('/');
        }
        else if(res.data.status === 403){
          errRef.current.innerHTML = "User already exist with this email. Please login!";
          errRef.current.style.display = "block"
        }
        else{
          errRef.current.innerHTML = "Something went wrong, Please Try again later";
          errRef.current.style.display = "block"
        }
  }

  return (
    <form onSubmit={(e) => handleSignup(e)} className='signupForm'>
      <div className="errBlock" ref={errRef}></div>
        <div className='formRow'>
            <img className='formIcon' src={userIcon} alt='user-icon'/>
            <input className='formInput' type='text' placeholder='Name' name='username' required ref={nameRef}/>
        </div>
        <div className='formRow'>
            <img className='formIcon' src={emailIcon} alt='email-icon'/>
            <input className='formInput' type='email' placeholder='Email' name='email' required ref={emailRef}/>
        </div>
        <div className='formRow'>
            <img className='formIcon' src={mobileIcon} alt='mobile-icon'/>
            <input className='formInput' type='number' placeholder='Mobile' name='mobile' required ref={mobileRef}/>
        </div>
        <div className='formRow'>
            <img className='formIcon' src={passIcon} alt='passowrd-icon'/>
            <input className='formInput' type='password' placeholder='Password' name='password' required ref={passwordRef}/>
        </div>
        <div className='formRow'>
          Already have an account? &nbsp;<a href='./login'>Log in</a>
        </div>
        <div className='formRow signupButtonRow'>
            <button className='signupButton'>Signup</button>
        </div>
        
    </form>
  )
}
