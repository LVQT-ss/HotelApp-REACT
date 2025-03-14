import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8081"
})


export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

    // this function add new room
    export async function addRoom(photo, roomType, roomPrice) {
        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("roomType", roomType)
        formData.append("roomPrice", roomPrice)
    
        const response = await api.post("/rooms/add/new-room", formData,{
            headers: getHeader()
        })
        if (response.status === 201) {
            return true
        } else {
            return false
        }
    }
    
    /* This function gets all room types from thee database */
    export async function getRoomTypes() {
        try {
            const response = await api.get("/rooms/room/types")
            return response.data
        } catch (error) {
            throw new Error("Error fetching room types")
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
 /* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}
/* This function update a room */
export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	const response = await api.put(`/rooms/update/${roomId}`, formData,{
		headers: getHeader()
	})
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
        const result = await api.get("/bookings/all-bookings", {
			headers: getHeader()
		})
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
//this function gets all available from the database with a given date and a room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
    
}
/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}