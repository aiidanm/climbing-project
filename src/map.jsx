import './App.css';
import { useState } from 'react';
import { createElement } from 'react';
import styled from "styled-components"

const marker = styled.div`


`
const Map = () => {
    const [elementCoords, setElementCoords] =useState([])
    const [testCoords, setTestCoords] = useState([])
  
    const handleClick = (event) => {
        
        
        let targetRect = event.currentTarget.getBoundingClientRect()
        const testX = event.clientX - targetRect.left;
        const testY = event.clientY - targetRect.top;


        var xPosition = event.clientX - event.target.offsetLeft
        var yPosition = event.clientY - event.target.offsetTop

        console.log(event.clientX, event.clientY, "event x and y")
        console.log(testX, testY, "used coords to place box")
        console.log(targetRect)

        setTestCoords((currTestCoords) => [...currTestCoords, [testX, testY]])
        setElementCoords((currElementCoords) => [...currElementCoords, [xPosition, yPosition]])
        
        // return <h1 style={{position: "absolute", left: `${item.style.left}`, top: `${item.style.top}`, border: "2px solid black"}}>test</h1>

    }

    return (
        <div className="mapDiv" onClick={handleClick}>
            {testCoords.map((coords) => {
                return <button  className='click_buttons' style={{position:  "fixed",left: coords[0], top: coords[1], border: "2px solid black"}}></button>
            })}
        </div>


    )

}

export default Map