import React from 'react'
import LoginRegisterPage from '../common/loginRegisterPageLayout/LoginRegisterPage'
import LoginForm from '../common/loginForm/LoginForm'
import SignupForm from '../common/SignupForm/SignupForm'

import { useState, useEffect } from 'react'

export default function Login() {
  const [form, setForm] = useState()
  useEffect(() => {
    setForm(<LoginForm signupForm={<SignupForm/>} setForm={setForm}/>)
  }, [])
  
  return (
    <LoginRegisterPage form={form}  />
  )
}
