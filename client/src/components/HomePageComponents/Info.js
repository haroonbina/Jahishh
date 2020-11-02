import React from 'react';
import {Link} from 'react-router-dom';

const Info = () =>{
    return (
        <div className="info">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 mt-5">
                        <h1 className="cus-h1">No Corona in office anymore</h1>
                        <p>
                            Stop worrying about crowd in your office while pandamic.
                            SmartDoor is here for you to control number of people and notify you
                            when it exceeds.
                        </p>
                        <Link to="/login" className="info-login-btn">Login</Link>
                    </div>
                    <div className="col col-lg-8 text-center mt-5">
                        <img src="/imgs/virus-img.png" className="virus-img img-fluid" alt="Corona-virus Pic"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-4 order-lg-8 mt-5 pt-5">
                        <h1>Very easy to setup</h1>
                        <p>
                            It just takes half a day to install and setup the system.
                            Also, our professional staff will 7/24 be available to provide 
                            support.  
                        </p>
                        <a href="#footer" className="info-contact-btn">Contact Us</a>
                    </div> 
                    <div className="col-12 col-lg-8 order-lg-4 mt-5">
                        <img src="/imgs/dashboard.png" className="dashboard-img" alt="dashboard Pic" />
                    </div>
                                          
                </div>
            </div>
        </div>
    )
}

export default Info;