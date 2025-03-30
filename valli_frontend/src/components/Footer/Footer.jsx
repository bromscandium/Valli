import React from "react"
import {useLocation, useNavigate} from "react-router-dom"
import "./Footer.sass"

const items = [
    {name: "Home", icon: "/home.png", route: "/"},
    {name: "Projects", icon: "/sprout.png", route: "/projects"},
    {name: "Profile", icon: "/user.png", route: "/profile"},
    {name: "Community", icon: "/people.png", route: "/community"},
    {name: "Chat", icon: "/agents.png", route: "/chat"},
]

function Footer() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <footer className="footerContainer">
            {items.map((item) => {
                const isActive = location.pathname === item.route
                return (
                    <div key={item.name} className="navItem" onClick={() => navigate(item.route)}>
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="icon"
                        />
                        <span className="label">
                            {item.name}
                        </span>
                        {isActive && <div className="underline"/>}
                    </div>
                )
            })}
        </footer>
    )
}

export default Footer
