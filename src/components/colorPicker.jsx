import { useState } from "react";

const ColorPicker = () => {
    const [color, setColor] = useState(null);
  
    return (
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
    );
  }

  export default ColorPicker