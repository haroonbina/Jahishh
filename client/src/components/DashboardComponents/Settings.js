import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';
import DashboardSideNav from './DashboardSideNav';
import { changePasswordAction } from '../../store/actions/UserActions'

class Settings extends Component{

    state = {
        userId: this.props.user.id,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    handleChange = (e) =>{ 
        this.props.resetAlerts();
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        if(!this.props.changePasswordStatus.loading){
            this.props.resetErrors();
            const errors = [];

            if(!this.state.currentPassword.trim()){
                errors.push('Current Password');
            }
            if(!this.state.newPassword.trim()){
                errors.push('New Password');
            }else if(this.state.newPassword.trim() !== this.state.confirmPassword.trim()){
                errors.push('Passwords do not match!');
            }

            if(errors.length > 0){
                return this.props.dispatchErrors(errors)
            }

            this.props.changePassword(this.state);

            this.setState({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        }
    }

    componentDidUpdate(){
        if(this.props.changePasswordStatus.success || this.props.changePasswordStatus.error){
            clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(() =>{
                this.props.resetAlerts();
            }, 2000)
        }
    }

    componentWillUnmount(){
        this.props.resetErrors();
        this.props.resetAlerts();
    }

    render(){
        if(!this.props.user.isAuthenticated) return <Redirect to="/login" />
        return(
            <div>
				<DashboardNav />

				<div className="addRoom-content container-fluid">
                    <div className="row">
                        <DashboardSideNav />
                        <div className="addRoom-main-content col col-md-9 col-xl-10 pb-5">
                            <h5 className="addRoom-main-content-title p-3 mb-1">Settings</h5>
                            <form className="p-4" onSubmit={this.handleSubmit}>
                                <h5 className="mb-4">Change Password</h5>
                                {
                                    this.props.changePasswordInputErrors.length > 0 ? (
                                        <div className="alert alert-danger">
                                            <h5>These values are required</h5>
                                            <ul>
                                                {
                                                    this.props.changePasswordInputErrors.map((input, index) => {
                                                        return <li className="error-item" key={index}>{input}</li>  
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                                {
                                    this.props.changePasswordStatus.loading ? (
                                        <div className="alert alert-warning">Processing Request...</div>
                                    ) : this.props.changePasswordStatus.success ? (
                                        <div className="alert alert-success">Password has been changed Successfully</div>
                                    ) : this.props.changePasswordStatus.error ? (
                                        <div className="alert alert-danger">{this.props.changePasswordStatus.error}</div>
                                    ) : (
                                        null
                                    )
                                }

                                <div className="form-group">
                                    <label htmlFor="currentPassword">current password</label>
                                    <input type="password" className="form-control" id="currentPassword" value={this.state.currentPassword} placeholder="Current Password" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New password</label>
                                    <input type="password" className="form-control" id="newPassword" value={this.state.newPassword} placeholder="New Password" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm password</label>
                                    <input type="password" className="form-control" id="confirmPassword" value={this.state.confirmPassword} placeholder="New Password" onChange={this.handleChange} />
                                </div>

                                <button type="submit" className="btn btn-primary mr-4">Save</button>
                                <Link to="/dashboard" className="btn btn-danger text-white">Close</Link>    
                            </form>
                        </div>
                    </div>
				</div>
			</div>         
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        changePasswordInputErrors: state.userData.changePasswordInputErrors,
        changePasswordStatus: state.userData.changePasswordStatus,
        user: state.userData.user,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        changePassword: (dataObject) => {dispatch(changePasswordAction(dataObject))},
        dispatchErrors: (errorsArray) => {dispatch({type: 'CHANGE_PASSWORD_INPUT_ERRORS', errorsArray})},
        resetErrors: () => {dispatch({type: 'RESET_CHANGE_PASSWORD_INPUT_ERRORS'})},
        resetAlerts: () => {dispatch({type: 'RESET_CHANGE_PASSWORD_ALERTS'})},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);