import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header'

const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error
    return (
        <div className='container'>
            <Header title="Booking Success">
                <div className='mt-5'>
                    {message ? (
                        <div>

                            <h3 className='text-success'>Booking Success ! </h3>
                            <p>{message}</p>

                        </div>
                    ):(
                        <div>

                        <h3 className='text-success'>Error Booking Room ! </h3>
                        <p>{error}</p>

                    </div>
                    )}
                </div>
            </Header>
        </div>
    )
}

export default BookingSuccess
