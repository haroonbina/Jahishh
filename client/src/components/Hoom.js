import React from 'react';
import {Link} from 'react-router-dom';


const Home = () =>{
    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Smart Room</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/login">Login <span class="sr-only">(current)</span></Link>
            {/* <Link className="nav-item nav-link" to="#">Features</Link>
            <Link className="nav-item nav-link" href="#">Pricing</Link>
            <Link className="nav-item nav-link disabled" href="#">Disabled</Link> */}
            </div>
        </div>
        </nav>

    )
}

export default Home;