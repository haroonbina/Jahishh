import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';
import DashboardSideNav from './DashboardSideNav';
import { createRoomAction } from '../../store/actions/RoomsActions'

class AddRoom extends Component{

    state = {
        roomName: '',
        deviceSn: '',
        maxPeopleNumber: 0,
        currentPeopleNumber: 0
    }

    handleChange = (e) =>{
        this.props.resetAlerts();
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        if(!this.props.createStatus.loading){
            this.props.resetErrors();
            const errors = [];

            if(!this.state.roomName.trim()){
                errors.push('Room Name');
            }
            if(!this.state.deviceSn.trim()){
                errors.push('Device Serial Number');
            }
            if(this.state.maxPeopleNumber <= 0){
                errors.push('Max People Number must be greater than 0');
            }
            if(this.state.currentPeopleNumber < 0){
                errors.push('Current People Number cannot be a negative value');
            }

            if(errors.length > 0){
                return this.props.dispatchErrors(errors)
            }

            this.props.createRoom(this.state);

            this.setState({
                roomName: '',
                deviceSn: '',
                maxPeopleNumber: 0,
                currentPeopleNumber: 0
            })
        }
    }

    componentDidUpdate(){
        if(this.props.createStatus.success || this.props.createStatus.error){
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
                            <h5 className="addRoom-main-content-title p-3 mb-1">Add Room</h5>
                            <form className="p-4" onSubmit={this.handleSubmit}>
                                {
                                    this.props.createRoomInputErrors.length > 0 ? (
                                        <div className="alert alert-danger">
                                            <h5>These values are required</h5>
                                            <ul>
                                                {
                                                    this.props.createRoomInputErrors.map((input, index) => {
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
                                    this.props.createStatus.loading ? (
                                        <div className="alert alert-warning">Processing Request...</div>
                                    ) : this.props.createStatus.success ? (
                                        <div className="alert alert-success">Room has been created Successfully</div>
                                    ) : this.props.createStatus.error ? (
                                        <div className="alert alert-danger">{this.props.createStatus.error}</div>
                                    ) : (
                                        null
                                    )
                                }

                                <div className="form-group">
                                    <label htmlFor="roomName">Room Name</label>
                                    <input type="text" className="form-control" id="roomName" value={this.state.roomName} placeholder="Room Name" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="deviceSn">Device Serial Number</label>
                                    <input type="text" className="form-control" id="deviceSn" value={this.state.deviceSn} placeholder="Device Serial Number" onChange={this.handleChange} />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="maxPeopleNumber">Max People Number</label>
                                    <input type="number" className="form-control" id="maxPeopleNumber" value={this.state.maxPeopleNumber} placeholder="Max People Number" onChange={this.handleChange}  />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="currentPeopleNumber">Current People Number</label>
                                    <input type="number" className="form-control" id="currentPeopleNumber" value={this.state.currentPeopleNumber} placeholder="Current People Number" onChange={this.handleChange}  />
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
        createRoomInputErrors: state.roomsData.createRoomInputErrors,
        createStatus: state.roomsData.createRoomStatus,
        user: state.userData.user,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createRoom: (roomObject) => {dispatch(createRoomAction(roomObject))},
        dispatchErrors: (errorsArray) => {dispatch({type: 'CREATE_ROOM_INPUT_ERRORS', errorsArray})},
        resetErrors: () => {dispatch({type: 'RESET_CREATE_ROOM_INPUT_ERRORS'})},
        resetAlerts: () => {dispatch({type: 'RESET_CREATE_ROOM_ALERTS'})},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRoom);

