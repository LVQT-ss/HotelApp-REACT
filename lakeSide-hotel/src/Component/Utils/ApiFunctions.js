import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8081"
})

    // this function add new room
export async function addRoom(photo,roomType,roomPrice){
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)
    
    const response = await api.post("/rooms/add/new-room", formData)
    if (response.status == 201){
        return true
    } else {
        return false
    }

}
// this function gets all room types
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    }catch(error){
        throw new Error("Error fetching room types ")

    }
}
// This function gets all room 
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }catch(error){
        throw new Error("Error fetching all rooms")
    }
}
//this functions deletes a room by id 
export async function deleteRoom(roomId){
        try {
            const result = await api.delete(`/rooms/delete/room/${roomId}`)
            return result.data
        }catch(error){
            throw new Error(`Error deleting room ${error.message}`)
        }

}
// this function update the room
// lỗi này ngồi tới 4h sáng 
export async function updateRoom(roomId, roomData){
    const formData = new FormData()
    formData.append("roomType",roomData.roomType)
    formData.append("roomPrice",roomData.roomPrice)
    formData.append("photo",roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`,formData)
    return response
}
// this function gets a room by the id
export async function getRoomById(roomId){
    try{
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    }catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }

}
// this functions saves a new booking to the database
export async function bookRoom(roomId, booking){
    try{
        const response = await api.post(`/bookings/room/${roomId}/booking`,booking)
        return response.data
    } catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        } else { 
            throw new Error(`Error booking room ${error.message}`)
        }
    }
}
// this function get all the booking in the database
export async function getAllBookings(){
    try{
        const result = await api.get("/bookings/all-bookings")
        return result.data
    }catch(error){
        throw new Error(`Error fetching all bookings: ${error.message}`)
    }
}
// this function get the booking by the confirmation code 
export async function getBookingByConfirmationcCode(confirmationCode){
    try{
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        } else { 
            throw new Error(`Error find booking ${error.message}`)
        }
    }
}
// this function cancel booking 
export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        } else { 
            throw new Error(`Error cancel booking ${error.message}`)
        }
    }
}
//this function get booking by confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}