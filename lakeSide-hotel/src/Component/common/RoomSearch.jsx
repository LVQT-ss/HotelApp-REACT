import React from 'react'

const RoomSearch = () => {
  const [searchQuery, setSearchQuery]= useState({
    checkInDate  :"",
    checkOutDate : "",
    roomType     : "",
   
  })
  const [errorMessage,setErrorMessage]= useState()
  const [availableRooms,setAvailableRooms] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const handleSearch =  (e) => {
    e.preventDefault
    const checkInMoment = moment(searchQuery.checkInDate)
    const checkOutMoment = moment(searchQuery.checkOutDate)
    if(!checkInMoment.isValid() ||!checkOutMoment.isValid()){
      setErrorMessage("Please enter valid dates")
      return
    }
    if(checkInMoment.isSameOrAfter(checkInMoment)){
      setErrorMessage("Check-in date should be before check-out date")
      return
    }
    setIsLoading(true)
    getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
    .then((response) => {
      setAvailableRooms(response.data)
      setTimeout(() => setIsLoading(false), 2000)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
}

const handleInputChange = (e) => {
  const { name, value } = e.target
  setSearchQuery({ ...searchQuery, [name]: value })
  const checkInDate = moment(searchQuery.checkInDate)
  const checkOutDate = moment(searchQuery.checkOutDate)
  if (checkInDate.isValid() && checkOutDate.isValid()) {
    setErrorMessage("")
  }
}
const handleClearSearch = () => {
  setSearchQuery({
    checkInDate: "",
    checkOutDate: "",
    roomType: ""
  })
  setAvailableRooms([])
}



  return (
    <div>
      
    </div>
  )
}

export default RoomSearch
