import ColorPicker from "./colorPicker";

const NewClimbForm = () => {
   


  return (
    <form>
      <label htmlFor="climbnameinput">Enter climb name </label>
      <input id="climbnameinput"></input>
      <label htmlFor="selectGrade"></label>
      <select id="selectGrade">
        <option>Lower end</option>
        <option>on grade</option>
        <option>hard for grade</option>
      </select>
      <ColorPicker />
    </form>
  );
};

export default NewClimbForm;
