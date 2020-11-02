import React from 'react';
import { Link } from 'react-router-dom';
import { BiDoorOpen } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

const MobileMenu = () =>{
    const handleClose = () =>{
        document.querySelector('.mobile-menu').classList.remove('active-mobile-menu');
    }
    return (
        <div className="mobile-menu d-md-none">
            <div className="mobile-menu-header">
                <Link to="/" className="mobile-menu-logo" onClick={handleClose} ><BiDoorOpen className="mobile-menu-logo-icon" />SmartDoor</Link>
                <MdClose className="mobile-menu-close-btn" onClick={handleClose} />
            </div>
            <ul className="mt-4">
                <li><Link to="/documentation" onClick={handleClose} >Documentation</Link></li>
                <li><a href="#footer" onClick={handleClose} >Contact</a></li>
            </ul>  

            <Link to="/login" className="mobile-menu-login-btn">Login</Link>
        </div>
    )
}

export default MobileMenu;