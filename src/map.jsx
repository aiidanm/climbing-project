import './App.css';
import { useState } from 'react';
import styled from "styled-components"

const marker = styled.div`


`
const Map = () => {
    const [elementCoords, setElementCoords] =useState([])
  
    const handleClick = (event) => {
        
        
        let targetRect = event.currentTarget.getBoundingClientRect()
        var xPosition = event.clientX - targetRect.left;
        var yPosition = event.clientY - targetRect.top;


        setElementCoords((currElementCoords) => [...currElementCoords, [xPosition, yPosition]])
        

    }

    return (
        <div className="mapDiv" onClick={handleClick}>
            {elementCoords.map((coords) => {
                return <button  className='click_buttons' style={{position:  "fixed",left: coords[0], top: coords[1], border: "2px solid black"}}></button>
            })}
        </div>


    )

}

export default Map