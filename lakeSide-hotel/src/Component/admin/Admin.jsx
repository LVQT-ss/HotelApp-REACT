import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <section className='container mt-5'>
      <h2>Welcome to admin Panel</h2>
      <hr/>
      <Link to={"/existing-rooms"}>
        Manage Rooms
      </Link>
      <Link to={"/existing-bookings"}>
        Manage Bookings
      </Link>
    </section>
  )
}

export default Admin
