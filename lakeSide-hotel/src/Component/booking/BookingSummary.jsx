import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap' // Add the import for Button

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const check_In_Date = moment(booking.check_In_Date)
    const check_Out_Date = moment(booking.check_Out_Date)
    const numberOfDays = check_Out_Date.diff(check_In_Date, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const navigate = useNavigate()

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true) // Update the state to true when booking is confirmed
            onConfirm()
        }, 3000)
    }

    useEffect(() => {
        if (isBookingConfirmed) {
            navigate("/booking-success")
        }
    }, [isBookingConfirmed, navigate])

    return (
        <div className='card card-body mt-5'>
            <h4>Reservation Summary</h4>
            <p>Full Name: <strong>{booking.guestName}</strong></p>
            <p>Email: <strong>{booking.guestEmail}</strong></p>
            <p>Check-In Date: <strong>{moment(booking.check_In_Date).format("MMM Do YYYY")}</strong></p>
            <p>Check-Out Date: <strong>{moment(booking.check_Out_Date).format("MMM Do YYYY")}</strong></p>
            <p>Number of Days: <strong>{numberOfDays}</strong></p>
            <div>
                <h5>Number of Guests</h5>
                <p>Adult{booking.numberOfAdults > 1 ? "s" : ""}: <strong>{booking.NumberOfAdults}</strong></p>
                <p>Children: <strong>{booking.NumberOfChildren}</strong></p>
            </div>
            {payment > 0 ? (
                <>
                    <p>Total Payment: <strong>{payment}</strong></p>

                    {isFormValid && !isBookingConfirmed ? (
                        <Button
                            variant="success"
                            onClick={handleConfirmBooking}
                        >
                            {isProcessingPayment ? (
                                <>
                                    <span className='spinner-border spinner-border-sm mr-2'
                                        role='status'
                                        aria-hidden='true'
                                    ></span>
                                    Booking Confirmed, redirecting to payment
                                </>
                            ) : (
                                "Confirm Booking and Proceed to Payment"
                            )}

                        </Button>
                    ) : isProcessingPayment ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='spinner-border text-primary' role='status'>
                                <span className='sr-only'>Loading</span>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <p className='text-danger'>Check-out date must be after check-in date</p>
            )}
        </div>
    )
}

export default BookingSummary
