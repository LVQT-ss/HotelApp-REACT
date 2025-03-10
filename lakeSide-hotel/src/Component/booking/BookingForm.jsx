import React, { useEffect, useState } from "react";
import { getRoomById, bookRoom } from "../Utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Form, FormControl, Button } from "react-bootstrap";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);

    const currentUser = localStorage.getItem("userId");

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser,
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: "",
    });
    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            throw new Error(error);
        }
    };
    const { roomId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId]);

    const calculatedPayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, 'days'); // Added 'days' unit
        const price = roomPrice ? roomPrice : 0;
        return diffInDays * price;

    };

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    };


    const isCheckOutDateValid = () => {
        if (
            !moment(booking.checkOutDate).isSameOrAfter(
                moment(booking.checkInDate)
            )
        ) {
            setErrorMessage("Check out date must come after check in date"); // Fixed error message
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (
            form.checkValidity() === false ||
            !isGuestCountValid() ||
            !isCheckOutDateValid()) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
        console.log("json file ")
    };
    
    const handleBooking = async () => {
        try {
            // Log the booking data
            console.log("Booking data being sent to backend:", {
                roomId: roomId,
                bookingDetails: booking
            });
    
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmitted(true);
            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            setErrorMessage(error.message);
            navigate("/booking-success", { state: { error: errorMessage } });
        }
    };

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <h4 className="card-title">Reserve Room</h4>

                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="guestFullName" className="hotel-color">Full Name:</Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName" // Fixed name attribute
                                        value={booking.guestFullName}
                                        placeholder="Enter your full name"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your full name
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail" className="hotel-color">Email:</Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail" // Fixed name attribute
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email address
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{ border: "2px" }}>
                                    <legend>Lodging Period</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="checkInDate" className="hotel-color">Check-In Date:</Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="Check-in date"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               Please select a check-in date 
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="col-6">
                                            <Form.Label htmlFor="checkOutDate" className="hotel-color">Check-Out Date:</Form.Label>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="Check-out date"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               Please select a check-out date 
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>number Of Guests</legend>
                                    <div className="row">
                                        <div className="col-6">               
                                            <Form.Label htmlFor="numOfAdults" className="hotel-color">Adults:</Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults" // Fixed name attribute
                                                value={booking.numOfAdults}
                                                min={1}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               Please select at least 1 adult 
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className="col-6">               
                                            <Form.Label htmlFor="numOfChildren" className="hotel-color">Children:</Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="numOfChildren"
                                                name="numOfChildren" // Fixed name attribute
                                                value={booking.numOfChildren}
                                                min={0} // Changed min value to 0 for children
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               Please select number of children
                                            </Form.Control.Feedback>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="form-group mt-2 mb-2">
                                    <Button type="submit" className="btn btn-hotel">Continue</Button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-6">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatedPayment()}
                                isFormValid={isValidated}
                                onConfirm={handleBooking}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingForm;