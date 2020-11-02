import React from 'react';
import {Link} from 'react-router-dom';

const Moto = () =>{
    return (
        <div className="moto py-5">
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center text-light">Experience safty and reliance with us</h1>
                        <div className="text-center my-3">
                            <Link to="/login" className="moto-login-btn">Login</Link>
                            <Link to="/documentation" className="moto-contact-btn">About System</Link>
                        </div>
                        
                    </div>                     
                </div>
            </div>
        </div>
    )
}

export default Moto;