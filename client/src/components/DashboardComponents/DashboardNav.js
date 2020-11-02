import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BiDoorOpen } from 'react-icons/bi';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
import { FiSidebar } from 'react-icons/fi';

class DashboardNav extends Component{

	componentDidUpdate(){
		const {logoutStatus, resetLogoutToast} = this.props
		if(logoutStatus.error){
            clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(() =>{
                resetLogoutToast();
            }, 2000);
        }
	}
	
	render(){
		const {logoutStatus} = this.props
		return (
			<div className="dashboard-nav">
				<FiSidebar className="dashboard-sidebar-icon d-md-none" onClick={() =>{document.querySelector('.dashboard-side-nav').classList.toggle('active-sidebar')}} />	
				<div className="dashboard-nav-logo text-white">
					<BiDoorOpen className="dashboard-nav-logo-icon"/>SmartDoor
				</div>
				<div>
					<FaFacebookSquare className="dashboard-nav-social-icon" />
					<FaTwitterSquare className="dashboard-nav-social-icon" />
					<FaInstagramSquare className="dashboard-nav-social-icon" />
				</div>

				{/* although the block below should have been in the DashboardSideNav component, 
					the CSS transform property of DashboardSideNav prevents the fixed position of Toast.
					Since this component (DashboardNav) is present in every other dashboard component,
					I included this Logout Toast here
				*/}
				{
					logoutStatus.loading ? (
						<div className="toast toast-loading">Loging out...</div>
					) : logoutStatus.error ? (
						<div className="toast toast-error">{logoutStatus.error}</div>
					) : (
						<div className="toast"></div>
					)
				}
			</div>
		)
	}
}

const mapStateToProps = (state) =>{
	return{
		logoutStatus: state.userData.logoutStatus,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		resetLogoutToast: () =>{dispatch({type: 'RESET_LOGOUT_TOAST'})},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNav);