import React from 'react';
import HomeNav from './HoomNav';
import MobileMenu from './MobileMenu';
import GeneralInfo from './Info';
import TeamMembers from './TeamMembers';
import Moto from './Moto';
import HomeFooter from './HomeFooter';
import '../../css/home.css';

const Home = () =>{
    return (
        <div id="home-page">
            <HomeNav />
            <MobileMenu />
            <div className="home-content">
                <GeneralInfo />
                <TeamMembers />
                <Moto />
                <HomeFooter />
            </div>
        </div>  
    )
}

export default Home;