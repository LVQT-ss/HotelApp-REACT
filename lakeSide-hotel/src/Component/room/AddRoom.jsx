import React, { useState } from "react";
import { addRoom } from "../Utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const AddRoom = () => {
  // State to hold new room data
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  // State for success and error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // State for image preview
  const [imagePreview, setImagePreview] = useState("");

  // Function to handle input changes for room details
  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    // Convert roomPrice to integer if it's a valid number
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    // Update newRoom state
    setNewRoom({ ...newRoom, [name]: value });
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    // Create and set image preview URL
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to add new room
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (success !== undefined) {
        // Set success message and reset form
        setSuccessMessage("A new room was added successfully !");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        // Set error message if adding room fails
        setErrorMessage("Error adding new room");
      }
    } catch (error) {
      // Set error message if an exception occurs
      setErrorMessage(error.message);
    }
    // Clear messages after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Add a New Room</h2>
            {/* Display success message if present */}
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}
            {/* Display error message if present */}
            {errorMessage && (
              <div className="alert alert-danger fade show">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Room Type Selector */}
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <div>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                  />
                </div>
              </div>
              {/* Room Price Input */}
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="roomPrice"
                  name="roomPrice"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              {/* Room Photo Input */}
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Room Photo
                </label>
                <input
                  required
                  name="photo"
                  id="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {/* Display image preview if available */}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview room photo"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  />
                )}
              </div>
              {/* Form buttons */}
              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link to={"/existing-rooms"} className="btn btn-outline-info">
                  Existing rooms
                </Link>
                <button type="submit" className="btn btn-outline-primary ml-5">
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;