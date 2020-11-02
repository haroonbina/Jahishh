import React from 'react';
import {Link} from 'react-router-dom';
import { BiDoorOpen, BiMenuAltRight } from 'react-icons/bi';

const HomeNav = () =>{
    return (
        <div className="navbar-wrapper">
            <Link to="/" className="home-nav-logo"><BiDoorOpen className="home-nav-logo-icon"/>SmartDoor</Link>
            <nav className="d-none d-md-block">
                <ul>
                    <li><Link to="/documentation">Documentation</Link></li>
                    <li><a href="#footer">Contact</a></li>
                    <li><Link to="/login" className="home-nav-login-btn">Login</Link></li>
                </ul>   
            </nav>
            <BiMenuAltRight className="mobile-menu-trigger d-md-none" onClick={() =>{document.querySelector('.mobile-menu').classList.add('active-mobile-menu')}} />
        </div>
    )
}

export default HomeNav;