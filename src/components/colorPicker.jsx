
const ColorPicker = ({newClimbColor, setNewClimbColor}) => {
    
  
    return (
      <input type="color" value={newClimbColor} onChange={e => setNewClimbColor(e.target.value)} />
    );
  }

  export default ColorPicker