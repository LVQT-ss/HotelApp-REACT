import React from 'react'
import { useState, useEffect } from "react";
import { getRoomTypes } from '../Utils/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    // State for storing room types
    const [roomTypes, setRoomTypes] = useState([""])
    // State for toggling new room type input visibility
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    // State for storing new room type input
    const [newRoomType, setNewRoomType] = useState("")

    // Effect hook to fetch room types on component mount
    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    }, [])

    // Handler for new room type input changes
    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value)
    }

    // Handler for adding a new room type
    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return (
        <>
            {roomTypes  && (
                <div>
                    {/* Room type dropdown selector */}
                    <select
                        required
                        className="form-select"
                        name="roomType"
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypeInput(true)
                            } else {
                                handleRoomInputChange(e)
                            }
                        }}
                        value={newRoom.roomType}>
                        <option value="">Select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {/* Conditional rendering of new room type input */}
                    {showNewRoomTypeInput && (
                        <div className="mt-2">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter New Room Type"
                                    value={newRoomType}
                                    onChange={handleNewRoomTypeInputChange}
                                />
                                <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default RoomTypeSelector