import React from "react"
import styles from './NavBar.module.css'
import { NavLink } from "react-router-dom";
function NavBar(){
    const pages = [
        {
            id: 1,
            path: "/",
            text: "Home"
        },
        {
            id: 2,
            path: "/fighters",
            text: "Fighters"
        },
        {
            id: 3,
            path: "/createfighters",
            text: "Create Fighters"
        }
    ]
    return (
        <nav className={styles.navBar}>
            <ul>
                {pages.map(page => {
                    return (
                        <li  className={styles.list} key={page.id}>
                            {<NavLink to={page.path}>
                            {page.text}
                            </NavLink>}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavBar;