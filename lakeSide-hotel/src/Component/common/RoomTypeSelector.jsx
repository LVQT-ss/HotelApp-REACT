import React, { useEffect } from 'react'

const RoomTypeSelector = ({handleRoomInputChange,newRoom}) => {
    const[roomTypes, setRoomTypes] =  useState([""])
    const[showNewRoomTypeInput,setShowNewRoomTypeInput] = useState(false)
    const[newRoomType,setNewRoomTypes] = useState("")

    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
    },[])

    const handleNewRoomTypeInputChange  = (e) =>{
        setNewRoomTypes(e.target.value);
    }
    const handleAddNewRoomType = () =>{
                if(newRoomType !== ""){
                    setRoomTypes([...roomTypes, newRoomType])
                    setNewRoomTypes("")
                    setShowNewRoomTypeInput(false);
                }
    }

  return (
    <>
     {
        roomTypes.length > 0 && ( 
            <div>
                <select
                  id='roomTypes'
                  name='roomTypes'
                  value={newRoom.roomTypes}
                  onChange={(e) =>{
                    if(e.target.value === "Add New"){
                        setShowNewRoomTypeInput(true)
                    } else {
                        handleRoomInputChange(e); 

                  }}
                }
                >
                    <option value={""}>select a room type </option>
                    <option value={"Add New"}>Add New</option>
                    {roomTypes.map((type,index)=(
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {showNewRoomTypeInput && (
                    <div className='input-group'>
                        <input
                        className='form-control'
                        type='text'
                        placeholder='enter a new room type'
                        onChange={handleNewRoomTypeInputChange}

                        />
                        <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>
                            Add
                        </button>
                        
                        
                      


                    </div>
                )}
            </div>
        )
     }
    </>
  )
}

export default RoomTypeSelector
