import React, { Component } from 'react';
import {Link} from 'react-router-dom';


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
		
		fetch('/admins/login', {
			method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(roomObject)
		})
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data =>{
                    dispatch({type: 'ROOM_FOR_EDIT', data});
                })
            } else {
                console.log('you need to contact your admin');
            }
        })
	}


	render(){
		return (
			<div className="limiter">
			<div className="container-login100">
				<div className="wrap-login100">
					<div className="login100-pic js-tilt" data-tilt>
						<img src="img/Login3.png" alt="IMG" />
					</div>
	
					<form className="login100-form validate-form">
						<span className="login100-form-title">
							Member Login
						</span>
	
						<div className="wrap-input100 validate-input" data-validate = "Valid user is required: ex@abc.xyz">
							<input className="input100" type="text" id="userName" placeholder="User Name" onChange={this.handleChange} />
							<span className="focus-input100"></span>
							<span className="symbol-input100">
							<i className="fas fa-user" aria-hidden="true"></i>
							</span>
						</div>
	
						<div className="wrap-input100 validate-input" data-validate = "Password is required">
							<input className="input100" type="password" id="password" placeholder="Password" onChange={this.handleChange} />
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<i className="fa fa-lock" aria-hidden="true"></i>
							</span>
						</div>
						
						<div className="container-login100-form-btn">
							<button className="login100-form-btn">
								Login
							</button>
						</div>
	
						<div className="text-center p-t-12">
							<span className="txt1">
								Forgot
							</span>
							<a className="txt2" href="#">
								Username / Password?
							</a>
						</div>
	
						<div className="text-center p-t-136">
							<a className="txt2" href="#">
								Create your Account
								<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
		)
	}


    
}

export default Login;