import '../App.css';
import { useState } from "react"


const Room1 = () => {
    const [elementCoords, setElementCoords] =useState([])

    const handleClick = (event) => {
        
        
        let targetRect = event.currentTarget.getBoundingClientRect()
        var xPosition = event.clientX - targetRect.left - 12.5
        var yPosition = event.clientY - targetRect.top - 12.5


        setElementCoords((currElementCoords) => [...currElementCoords, [xPosition, yPosition]])
        
    }
    return (
        <div className="room1_div" onClick={handleClick}>
            {elementCoords.map((coords) => {
                return <button  className='click_buttons' style={{position:  "fixed",left: coords[0], top: coords[1], border: "2px solid black"}}></button>
            })}
        </div>
        
    )
}

export default Room1