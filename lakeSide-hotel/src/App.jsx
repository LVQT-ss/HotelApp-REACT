import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from "./Component/room/AddRoom.jsx";
import ExistingRooms from "./Component/room/ExistingRooms.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Component/home/Home.jsx";
import EditRoom from "./Component/room/EditRoom.jsx";
import Footer from "./Component/layout/Footer.jsx";
import NavBar from "./Component/layout/NavBar.jsx";
function App() {


  return (
    <>
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />

        </Routes>
        <Footer/>
      </Router>
    </main>

    </>
  )
}

export default App;
