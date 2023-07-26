import { useState } from "react"
import { login } from "./apirequests"

const LoginPage = () => {

    const [loginDetails, setLoginDetails] = useState({})
    // const [isDataError, setIsDataError] = useState(false)

    const handleChange = (e) => {
            setLoginDetails({
                email: e.target.parentElement[0].value,
                password: e.target.parentElement[1].value
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()
            login(loginDetails)
        
    }
    return (
        <>
        <h1>Login</h1>
        <form className="newClimbForm" onChange={handleChange} onSubmit={handleLogin}>
            <label htmlFor="loginemail">Email address</label>
            <input id="loginemail"></input>
            <label htmlFor="loginpassword">Password</label>
            <input id="loginpasword" type="password"></input>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default LoginPage