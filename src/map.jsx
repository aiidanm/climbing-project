import './App.css';
import { useState } from 'react';
import { createElement } from 'react';

const Map = () => {

  
    const handleClick = (event) => {
        
        
        var item = document.createElement("span");
        item.className = "item";
        var xPosition = event.clientX - (item.clientWidth);
        var yPosition = event.clientY - (item.clientHeight);
        item.style.left = xPosition + "px";
        item.style.top = yPosition + "px";
        item.style.border = "2px solid black"
        return <h1 style={{left: `${item.style.left}`, top: `${item.style.top}`, border: "2px solid black"}}>test</h1>

    }

    return (
        <div className="mapDiv" onClick={handleClick}>
            
        </div>


    )

}

export default Map