import { Link } from "react-router-dom"

const NavButtons = () => {


    return (
        <div className="nav_container">
            <Link to="/room1">
            <button id="room1button">Room 1</button>
            </Link>
        </div>
    )
}

export default NavButtons