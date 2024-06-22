import React, { useEffect, useState } from "react";
import { getRoomById } from "../Utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
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
    NumOfAdults: "",
    NumOfChildren: "",
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
  const getRoomPriceById = async (roomId)=>{
    try{
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice)
    }catch(error){
        throw new Error(error)
    }
  }
  const {roomId} = useParams()
  const navigate = useNavigate()
   useEffect(() =>{
     getRoomPriceById(roomId)
    },[roomId])

    const calculatedPayment = () =>{
        const  check_In_Date = moment(booking.check_In_Date)
        const check_Out_Date = moment(booking.check_Out_Date)
        const diffInDays = check_Out_Date.diff(check_In_Date)
        const price = roomPrice ? roomPrice : 0 
        return diffInDays * price
    }
    const isGuestCountValid= () => { 
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.NumOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }
    const isCheckOutDateValid=()=>{
        if(!moment(booking.check_Out_Date).isSameOrAfter(moment(booking.check_In_Date))){
            setErrorMessage("Check out date must come before check in date")
                return false
        } else {
            setErrorMessage("")
            return true
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const form = e.currentTarget

        if(form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid ){
            e.stopPropagration()
        }else {
            setIsSubmitted(true)
        
        }
        setIsValidated(true)
    }
    const handleBooking = async () =>{
        try{
            const confirmationCode = await bookRoom(roomId,booking)
            setIsSubmitted(true)
            navigate("/",{state:{message:confirmationCode}})
        }catch(error){
            setErrorMessage(error.message)
            navigate("/",{state:{error:errorMessage}})
        }
    }

  return <div></div>;
};

export default BookingForm;
