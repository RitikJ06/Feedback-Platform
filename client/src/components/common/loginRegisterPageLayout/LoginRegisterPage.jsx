import React from 'react'
import './LoginRegisterPage.css'

import { useState, useEffect } from 'react';

export default function LoginRegisterPage(props) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div className='wrapper'>
        <div className={isDesktop ? 'innerWrapper' : "innerWrapper innerWrapperRes"}>
            <div className='feedBackTextWrapper'>
              <h1>Feedback</h1>
              <p>Add your products and give us your valuable feedback</p>
            </div>
            <div className={isDesktop ? 'formwrapper' : "formwrapper formwrapperRes"}>
              {props.form}
            </div>
        </div>
    </div>
  )
}
