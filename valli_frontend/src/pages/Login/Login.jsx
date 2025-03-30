import React, {useState} from "react"
import {Helmet} from "react-helmet-async"
import Header from "../../components/Header/Header.jsx"
import "./Login.sass"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        alert(`Email: ${email}\nPassword: ${password}`)
    }

    return (
        <div>
            <Helmet>
                <title>Valli | Login</title>
            </Helmet>
            <Header/>
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title">Welcome Back</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <button className="login-button" onClick={handleLogin}>
                        Log In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
