import { Link } from "react-router-dom";

const UserButtons = () => {
  

  return (
    <div id="userbuttons">
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default UserButtons;
