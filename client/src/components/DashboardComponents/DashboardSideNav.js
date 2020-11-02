import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiOutlineDashboard, AiOutlineSetting } from 'react-icons/ai';
import { IoIosAddCircleOutline, IoMdLogOut } from 'react-icons/io';
import { LogoutAction } from '../../store/actions/UserActions';


const DashboardSideNav = ({user, logout}) =>{
	const handleLogout = (e) =>{
		e.preventDefault();
		logout()
	}	
	return (
		<div className="dashboard-side-nav col-md-3 col-xl-2">
			{/* <div className="profile text-center text-white">
				<div className="profile-pic-wrapper">
					<img src="/imgs/profile-pic.jpg" className="img-fluid" alt="profile-pic" />
				</div>
				<p className="text-capitalize">{user.name}</p>
			</div> */}
			<ul className="mt-3">
				<li className=""><Link to="/dashboard" className="side-nav-link"><AiOutlineDashboard className="side-nav-icon" />Dashboard</Link></li>
				<li><Link to="/addRoom" className="side-nav-link"><IoIosAddCircleOutline className="side-nav-icon" />Add Room</Link></li>
				<li><Link to="/settings" className="side-nav-link"><AiOutlineSetting className="side-nav-icon" />Setting</Link></li>
				<li><a href='/admins/logout' className="side-nav-link" onClick={handleLogout}><IoMdLogOut className="side-nav-icon" />Log out</a></li>
			</ul>
			 
		</div>
	)
}

const mapStateToProps = (state) =>{
	return{
		user: state.userData.user,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		logout: () =>{dispatch(LogoutAction())},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSideNav);