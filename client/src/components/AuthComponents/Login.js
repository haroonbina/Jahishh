import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { BiDoorOpen } from 'react-icons/bi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { LoginAction } from '../../store/actions/UserActions';
import '../../css/login.css';



class Login extends Component { 

	state = {
		userName: '',
		password: ''
	}

	handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value,
        })
	}
	
	handleSubmit = (e) =>{
		e.preventDefault();
		if(!this.props.loginStatus.loading){
			this.props.login(this.state);
		}	
	}

	componentWillUnmount(){
		this.props.restAlerts();
	}

	render(){
		if(this.props.user.isAuthenticated) return <Redirect to='/dashboard' />

		return (
			<div className="login-form-wrapper py-6">			
				<div className="login-form-content">
					<BiDoorOpen className="login-logo-icon"/>
					<h3 className="login-title my-3">Login to SmartDoor</h3>
					<form className="login-form p-4" onSubmit={this.handleSubmit}>
						{
							
							this.props.loginStatus.error ? (
								<div className="alert alert-danger text-left">{this.props.loginStatus.error}</div>
							) : (null)
						}
						<div className="form-group">
							<label htmlFor="userName" className="w-100 text-left">User Name</label>
							<input type="text" className="form-control" id="userName" placeholder="Enter User Name" onChange={this.handleChange} />
						</div>
						<div className="form-group">
							<label htmlFor="password" className="w-100 text-left">Password</label>
							<input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={this.handleChange} />
						</div>
						
						<button type="submit" className="login-submit-btn mt-2">{ this.props.loginStatus.loading ? ('Loging in...') : ('submit')}</button>
					</form>
					<div className="back-to-home-box mt-3">
						<Link to="/" className="back-to-home-link"><IoMdArrowRoundBack className="back-arrow" />Back to Home</Link>
					</div>
				</div>
			</div>
		)
	}


    
}

const mapStateToProps = (state) =>{
	return{
		loginStatus: state.userData.loginStatus,
		user: state.userData.user,
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		login: (credentials) =>{dispatch(LoginAction(credentials))},
		restAlerts: () =>{dispatch({type: 'RESET_LOGIN_ALERTS'})}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);