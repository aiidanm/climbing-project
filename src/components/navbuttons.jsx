import { Link } from "react-router-dom"

const NavButtons = () => {


    return (
        <div className="nav_container">
            <Link to="/room1">
            <button id="room1button">Room 1</button>
            </Link>
            <Link to="/room2">
            <button id="room2button">Room 2</button>
            </Link>
            <Link to="/room3">
            <button id="room3button">Room 3</button>
            </Link>
        </div>
    )
}

export default NavButtons