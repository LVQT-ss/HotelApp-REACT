import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BookingSummary = ({booking,payment,isFormValid,onConfirm}) => {
    const check_In_Date = moment(booking.check_In_Date)
    const check_Out_Date = moment(booking.check_Out_Date)
    const numberOfDays= check_Out_Date.diff(check_In_Date,"days")
    const[isBookingConfirmed,setIsBookingConfirmed] = useState(false)
    const[isProcessingPayment,setIsProcessingPayment] = useState(false)

    const navigate = useNavigate()

    const handleConfirmBooking =()=>{
        setIsProcessingPayment(true)
        setTimeout(()=>{
            setIsProcessingPayment(false)
            setIsBookingConfirmed(false)
            onConfirm()
        },3000)
    }


    useEffect(() =>{
        if(isBookingConfirmed){
            navigate("/booking-success")}
    }, [isBookingConfirmed,navigate])
         
  return (
    <div className='card card-body mt-5'>
        <h4>Reservation Summaty</h4>
      <p>fullname : <strong>{booking.guestName}</strong></p>
      <p>email : <strong>{booking.guestEmail}</strong></p>
      <p>check in date : <strong>{moment(booking.check_In_Date).format("MMM Do YYYY")}</strong></p>
      <p>check out date : <strong>{moment(booking.check_In_Date).format("MMM Do YYYY")}</strong></p>
      <p>Number of Days : <strong>{numberOfDays}</strong></p>
      <div>
        <h5>Number of guest</h5>
        <strong>Adult {booking.numberOfAdults > 1 ? "s" : ""}:{booking.numberOfAdults}</strong>
        <strong>Children {booking.numberOfChildren}</strong>
      </div>
      {payment > 0 ? (
        <>
        <p>Total Payment : <strong>{payment}</strong></p>

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
                >Booking Confirmed, redirecting to payment
                
                </span>
                </>
            ):(
                "Confirm Booking and proceed to payment"
            )}
            
            </Button>
        ): isBookingConfirmed(

            <div className='d-flex justify-content-center align-items-center'>
                <div className='spinner-border text-primary' role='status'>
                    <span className='sr-only'>Loading</span>
                </div>
            </div>
        ):null}
        </>
      ):(
        <p className='text-danger'>Check out date must be after check in date </p>
      )}
    </div>
  )
}

export default BookingSummary
