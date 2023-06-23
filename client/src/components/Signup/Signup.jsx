import React from 'react'
import LoginRegisterPage from '../common/loginRegisterPageLayout/LoginRegisterPage'
import LoginForm from '../common/loginForm/LoginForm'
import SignupForm from '../common/SignupForm/SignupForm'
import { useState, useEffect } from 'react'


export default function Signup() {
  const [form, setForm] = useState()
  useEffect(() => {
    setForm(<SignupForm loginForm={<LoginForm/>} setForm={setForm}/>)
  }, [])
  
  return (
    <LoginRegisterPage form={form}/>
  )
}
