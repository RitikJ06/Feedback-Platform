import React from 'react'
import LoginRegisterPage from '../common/loginRegisterPageLayout/LoginRegisterPage'
import LoginForm from '../common/loginForm/LoginForm'

export default function Login() {  
  return (
    <LoginRegisterPage form={<LoginForm isMain={false}/>}  />
  )
}
