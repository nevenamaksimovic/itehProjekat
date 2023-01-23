
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function HomePage() {
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('/funfact').then(res => {
      setText(res.data.text)
    })
  }, [])

  return (
    <div>
      <div className='mainSecondSection'>
        <div className='title'>
          Pacient's pleasure and trust is our greatest motivation
        </div>
        <br />
        <div className='content'>
          Our company is part of a long family tradition, long 70 years
          <br />
          Our founder, Nevena Maksimovic, has opened first ordination in Belgrade back in 1948.
          <br />
          Since that, the company has expanded into varios locations in Serbia (Belgrade, Novi Sad, Nis).
          <br />
          <br />
          In our facilities we offer a wide range of medical services.
        </div>
        <div className='padding'>
          <div className='header'>
            Fun fact
          </div>
          <div className='padding'>
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}
