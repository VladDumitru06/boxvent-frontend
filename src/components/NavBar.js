import React from "react"
import logo from "../Images/logo.png"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import GetRole from "./GetRole";
function NavBar(){
    const pages = [
        {
            id: 1,
            path: "/fighters",
            text: "Fighters",
            roles: ["CLIENT","ADMIN"]
        },
        {
            id: 2,
            path: "/fighters/create",
            text: "Create Fighters",
            roles: ["ADMIN"]
        },
        {
            id: 3,
            path: "/login",
            text: "Login",
            roles: ["CLIENT","ADMIN"]
        },
    ]
    return (
<div>
        <Navbar bg="dark" expand="lg" >
      <Container>
        <Navbar.Brand className="text-white"  href="/"><Image fluid={true} src={logo} alt="Logo" width={60}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {pages.map(page => {
                console.log(GetRole().roles);
            if(GetRole().roles.some(UserRole=> page.roles.includes(UserRole)))
            {
                    return (
                        <div  key={page.id}>
                            {<Nav.Link className="text-white" href={page.path}>
                            {page.text}
                            </Nav.Link>}
                        </div>
                    )
                }
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


        </div>
    )
}

export default NavBar;