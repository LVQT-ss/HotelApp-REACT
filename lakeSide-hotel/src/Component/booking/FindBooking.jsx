import React, { useState } from 'react'
// Added missing imports for cancelBooking and moment
import { getBookingByConfirmationCode, cancelBooking } from '../Utils/ApiFunctions'
import moment from 'moment'

const FindBooking = () => {
    // State declarations
    const [confirmationCode, setConfirmationCode] = useState("")
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        bookingConfirmationCode: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "", // Changed from guestName to match state structure
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumberOfGuest: ""
    })

    // Empty booking info object for resetting
    const emptyBookingInfo = {
        // ... (same as initial bookingInfo state)
    }
    const [isDeleted, setIsDeleted] = useState(false)

    // Handler for input change
    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    // Handler for form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(emptyBookingInfo)
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }

        // Set loading to false after 2 seconds
        setTimeout(() => setIsLoading(false), 2000)
    }

    // Handler for booking cancellation
    const handleBookingCancellation = async () => {
        try {
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
            setError(null)
        } catch (error) {
            setError(error.message)
        }
        // Reset success message and isDeleted state after 2 seconds
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <>
            <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
                <h2>Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className='col-md-6'>
                    <div className='input-group mb-3'>
                        <input
                            className='form-control'
                            id='confirmationCode'
                            name='confirmationCode'
                            value={confirmationCode}
                            onChange={handleInputChange}
                            placeholder='Enter the booking code'
                        />
                        <button className='btn btn-hotel input-group-text'>Find Booking</button>
                    </div>
                </form>
                {/* Conditional rendering based on component state */}
                {isLoading ? (
                    <div>Finding booking...</div>
                ) : error ? (
                    <div className='text-danger'>{error}</div>
                ) : bookingInfo.bookingConfirmationCode ? (
                    <div className='col-md-6 mt-4 mb-5'>
                        <h3>Booking Information</h3>
                        {/* Display booking details */}
                        <p>Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                        <p>Room Number: {bookingInfo.room.id}</p>
                        <p>Room Type: {bookingInfo.room.roomType}</p>
                        <p>
                            Check-in Date:{" "}
                            {/* Fixed date formatting, removed incorrect month subtraction */}
                            {moment(bookingInfo.checkInDate).format("MMM Do, YYYY")}
                        </p>
                        <p>
                            Check-out Date:{" "}
                            {/* Fixed date formatting, removed incorrect month subtraction */}
                            {moment(bookingInfo.checkOutDate).format("MMM Do, YYYY")}
                        </p>
                        <p>Full Name: {bookingInfo.guestFullName}</p>
                        <p>Email Address: {bookingInfo.guestEmail}</p>
                        <p>Adults: {bookingInfo.numOfAdults}</p>
                        <p>Children: {bookingInfo.numOfChildren}</p>
                        <p>Total Guests: {bookingInfo.totalNumberOfGuest}</p>

                        {/* Show cancel button if booking is not deleted */}
                        {!isDeleted && (
                            <button
                                onClick={handleBookingCancellation}
                                className="btn btn-danger">
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <div>Find booking...</div>
                )}
                {/* Show success message if booking is deleted */}
                {isDeleted && <div className="alert alert-success mt-3">{successMessage}</div>}
            </div>
        </>
    )
}

export default FindBooking