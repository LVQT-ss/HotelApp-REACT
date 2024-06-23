import React, { useEffect, useState } from "react";
import { getRoomById } from "../Utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: "",
        check_In_Date: "",
        check_Out_Date: "",
        NumberOfAdults: "",
        NumberOfChildren: "",
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
        const check_In_Date = moment(booking.check_In_Date);
        const check_Out_Date = moment(booking.check_Out_Date);
        const diffInDays = check_Out_Date.diff(check_In_Date);
        const price = roomPrice ? roomPrice : 0;
        return diffInDays * price;
    };
    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.NumberOfAdults);
        const childrenCount = parseInt(booking.NumberOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    };
    const isCheckOutDateValid = () => {
        if (
            !moment(booking.check_Out_Date).isSameOrAfter(
                moment(booking.check_In_Date)
            )
        ) {
            setErrorMessage("Check out date must come before check in date");
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
            !isCheckOutDateValid
        ) {
            e.stopPropagration();
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
    };
    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmitted(true);
            navigate("/", { state: { message: confirmationCode } });
        } catch (error) {
            setErrorMessage(error.message);
            navigate("/", { state: { error: errorMessage } });
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
                                    <Form.Label htmlFor="guestName" className="hotel-color">full name:</Form.Label>

                                    <FormControl
                                        required
                                        type="text"
                                        id="guestName"
                                        name="guestValue"
                                        value={booking.guestName}
                                        placeholder="enter your full name"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        please enter your full name
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestName" className="hotel-color">Email:</Form.Label>

                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="enter your email"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        please enter your email address
                                    </Form.Control.Feedback>

                                </Form.Group>


                                <fieldset style={{ border: "2px" }}>
                                    <legend>Lodging period</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="check_In_Date" className="hotel-color">Check-In date:</Form.Label>

                                            <FormControl
                                                required
                                                type="text"
                                                id="check_In_Date"
                                                name="check_In_Date"
                                                value={booking.check_In_Date}
                                                placeholder="check-in date"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               Please select a check-in-date 
                                            </Form.Control.Feedback>
                                    </div>
                                    <div className="col-6">
                                            <Form.Label htmlFor="check_Out_Date" className="hotel-color">Check-Out date:</Form.Label>

                                            <FormControl
                                                required
                                                type="text"
                                                id="check_Out_Date"
                                                name="check_Out_Date"
                                                value={booking.check_Out_Date}
                                                placeholder="check-in date"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               Please select a check-out Date 
                                            </Form.Control.Feedback>

                                        

                                    </div>

                                    {errorMessage && <p className="error-message  text-danger">{errorMessage}</p>}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Number Of Guests</legend>
                                <div className="row">
                                    <div className="col-6">               
                                            <Form.Label htmlFor="NumberOfAdults" className="hotel-color">Adults:</Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="check_In_Date"
                                                name="check_In_Date"
                                                value={booking.NumberOfAdults}

                                                min={1}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               Please select atleast 1 adult 
                                            </Form.Control.Feedback>
                                    </div>

                                    <div className="col-6">               
                                            <Form.Label htmlFor="NumberOfChildren" className="hotel-color">Children:</Form.Label>
                                            <FormControl
                                                required
                                                type="number"
                                                id="NumberOfChildren"
                                                name="NumberOfChildren"
                                                value={booking.NumberOfChildren}
                                              
                                                min={1}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                               please select children
                                            </Form.Control.Feedback>
                                    </div>
                                    </div>
                            </fieldset>
                            <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel">Continue</button>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="col-md-6">
                    {isSubmitted && (
                        <BookingSummary
                        booking={booking}
                        payment={calculatedPayment}
                        isFormValid={isValidated}
                        onConfirm={handleBooking}
                        />
                    )}
                </div>
            </div>
        </div >
    </>
  );
};

export default BookingForm;
