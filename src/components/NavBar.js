import React from "react"
import logo from "../Images/logo.png"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import GetRole from "./GetRole";
import navbarStyles from "./NavBar.styles";
function NavBar() {
    const [bgColor, setBgColor] = React.useState("transparent");
    const [textColor, setTextColor] = React.useState("text-dark");
    const navbarRef = React.useRef();


    const pages = [
        {
            id: 1,
            path: "/fighters",
            text: "Fighters",
            roles: ["CLIENT", "ADMIN", "GUEST"]
        },
        {
            id: 2,
            path: "/events",
            text: "Events",
            roles: ["CLIENT", "ADMIN", "GUEST"]
        },
        {
            id: 3,
            path: "/fighters/create",
            text: "Create Fighters",
            roles: ["ADMIN"]
        },
        {
            id: 4,
            path: "/events/create",
            text: "Create Events",
            roles: ["ADMIN"]
        },
        {
            id: 5,
            path: "/tickets",
            text: "Tickets",
            roles: ["CLIENT", "ADMIN"]
        },
        {
            id: 6,
            path: "/login",
            text: "Login",
            roles: ["CLIENT", "ADMIN", "GUEST"]
        },
        {
            id: 7,
            path: "/register",
            text: "Register",
            roles: ["CLIENT", "ADMIN", "GUEST"]
        },
        {
            id: 8,
            path: "/logout",
            text: "Logout",
            roles: ["CLIENT", "ADMIN"]
        },
    ]

    return (
        <div>

            <Navbar
                sticky="top"
                ref={navbarRef}
                className="nav-transition"
                style={navbarStyles}
                onMouseEnter={() => { setBgColor("dark"); setTextColor("text-white"); }}
                onMouseLeave={() => { setBgColor("transparent"); setTextColor("text-dark"); }}
                bg={bgColor}
                expand="lg"
            >

                <Container>
                    <Navbar.Brand className={textColor} href="/"><Image fluid={true} src={logo} alt="Logo" width={60} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {pages.map(page => {
                                if (GetRole().roles.some(UserRole => page.roles.includes(UserRole))) {
                                    return (
                                        <Nav.Link key={page.id} className={textColor} href={page.path}>
                                            {page.text}
                                        </Nav.Link>
                                    )
                                }
                                return <></>
                            })}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


        </div>
    )
}

export default NavBar;