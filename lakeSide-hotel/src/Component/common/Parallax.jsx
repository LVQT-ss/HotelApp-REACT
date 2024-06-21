import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className='parallax mb-5 '>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
        <h1>Welcome to <span className='hotel color'>MyHotel Mag</span></h1>
        </div>
        <h3>We offer the best pricing renting hotel in every area </h3>
      </Container>
    </div>
  )
}

export default Parallax
