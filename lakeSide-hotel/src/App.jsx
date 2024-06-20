import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from "./Component/room/AddRoom.jsx";
import ExistingRooms from "./Component/room/ExistingRooms.jsx";

function App() {


  return (
    <>
     <AddRoom/>
     <ExistingRooms/>
    </>
  )
}

export default App;
