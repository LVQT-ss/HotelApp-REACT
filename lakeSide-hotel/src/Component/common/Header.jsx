import React from 'react'

const Header = ({title}) => {
  return (
    <header className='header'>
      <div className='overlay'></div>
      <div className='header-title text-center'>{title}</div>
    </header>
  )
}

export default Header
