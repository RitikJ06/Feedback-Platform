import React from 'react'
import './HeroSection.css'
import heroImage from './../../../images/hero_image.png'

export default function HeroSection() {
  return (
    <div className='heroSectionWrapper'>
      <div className='heroImageWrapper'>
          <img className='heroImage' alt='hero section image' src={heroImage}/>
      </div>

      <div className='heroTextWrapper'>
        <h1>Add your products and give your valuable feedback</h1>
        <p>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</p>
      </div>

    </div>
  )
}
