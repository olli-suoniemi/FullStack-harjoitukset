import React from "react"

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
    return(
        <form onSubmit={handleLogin}>
            <div> username: <input type="text" value={username} onChange={handleUsernameChange}/> </div>
            <div> password: <input type="password" value={password} onChange={handlePasswordChange}/> </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm