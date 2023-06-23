import React from 'react'
import './LoginRegisterPage.css'


export default function LoginRegisterPage(props) {

  return (
    <div className='wrapper'>
        <div className='innerWrapper'>
            <div className='feedBackTextWrapper'>
              <h1>Feedback</h1>
              <p>Add your products and give us your valuable feedback</p>
            </div>
            <div className='formwrapper'>
              {props.form}
            </div>
        </div>
    </div>
  )
}
