import React from 'react'
import LoginRegisterPage from '../common/loginRegisterPageLayout/LoginRegisterPage'
import SignupForm from '../common/SignupForm/SignupForm'


export default function Signup() {
  
  return (
    <LoginRegisterPage form={<SignupForm isMain={false} />}/>
  )
}
