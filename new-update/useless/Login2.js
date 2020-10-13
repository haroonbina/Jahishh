import React from 'react';


class Login2 extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
				<form className="login100-form validate-form flex-sb flex-w">
					<span className="login100-form-title p-b-32">
						Account Login
					</span>

					<span className="txt1 p-b-11">
						Username
					</span>
					<div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
						<input className="input100" type="text" name="username" />
						<span className="focus-input100"></span>
					</div>
					
					<span className="txt1 p-b-11">
						Password
					</span>
					<div className="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
						<span className="btn-show-pass">
							<i className="fa fa-eye"></i>
						</span>
						<input className="input100" type="password" name="pass" />
						<span className="focus-input100"></span>
					</div>
					
					<div className="flex-sb-m w-full p-b-48">
						<div className="contact100-form-checkbox">
							<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
							<label className="label-checkbox100" htmlFor="ckb1">
								Remember me
							</label>
						</div>

						<div>
							<a href="#" className="txt3">
								Forgot Password?
							</a>
						</div>
					</div>

					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Login
						</button>
					</div>

				</form>
			</div>
		</div>
	</div>
            </React.Fragment>
        );
    }
}

export default Login2;