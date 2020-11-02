import React from 'react';

const TeamMembers = () =>{
    return (
        <div className="container team-members py-5">
            <h1 className="py-5 text-center">Our Team Members</h1>
            <div className="row pb-3">
                <div className="col-12 col-md-6 col-xl-4 text-center mb-5">                           
                    <img src="/imgs/manish.png" className="team-member-img" alt="Manish Mehra Pic"/>
                    <p className="team-member-title pt-4">Habibi, Front-End Engineer</p>                                                
                </div>
                <div className="col-12 col-md-6 col-xl-4 text-center mb-5">
                    <img src="/imgs/chumky.png" className="team-member-img" alt="Chumky Khan Pic"/>
                    <p className="team-member-title pt-4">Chumky Khan, Back-End Engineer</p>  
                </div>                       
                <div className="col-12 col-md-6 mx-md-auto col-xl-4 text-center mb-5">
                    <img src="/imgs/haroon.png" className="team-member-img" alt="Haroon Bina Pic"/>
                    <p className="team-member-title pt-4">Haroon Bina, Full-Stack Developer</p>   
                </div>                       
            </div>
        </div>
    )
}

export default TeamMembers;