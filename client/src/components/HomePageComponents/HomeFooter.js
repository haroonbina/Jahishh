import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaMobile, FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
import { BiDoorOpen } from 'react-icons/bi';

const HomeFooter = () =>{
    return (
        <footer id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 pt-5 text-center">
                        <h3 className="footer-logo"><a href="/" className="footer-logo"><BiDoorOpen className="home-footer-logo-icon" />SmartDoor</a></h3>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4 pt-5 text-center">
                        <h3 className="mb-3">Contact Us</h3>                    
                        <p>
                            <FaMapMarkerAlt className="contact-icons" />
                            Germany Wedel 22880
                        </p>
                        <p>
                            <FaEnvelope className="contact-icons" />
                            haroon_bina@hotmail.com 
                        </p>
                        <p>
                            <FaMobile className="contact-icons" />
                            +4915219082751
                        </p> 
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4 pt-5 text-center">
                        <h3 className="mb-3">Social Media</h3>                   
                        <FaFacebookSquare className="social-icon" />
                        <FaTwitterSquare className="social-icon" />
                        <FaInstagramSquare className="social-icon" />            
                    </div>
                </div>
            </div>
            <div className="mt-5 py-3 pl-5 copy-right">
                &copy; 2020 Haroon Bina, Manish, Chumky, Alen
            </div>
        </footer>
    )
}

export default HomeFooter;