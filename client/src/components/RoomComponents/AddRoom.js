import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
        clearTimeout(this.hideTimeout);
        if(this.props.createStatus.success || this.props.createStatus.error){
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
        console.log(this.props.createStatus)
        return(
            <div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Add Room</h1>
							</div>
						</div>
					</div>
				</div>

				<section className="content">
                    <form className="bg-white p-4" onSubmit={this.handleSubmit}>
                        {
                            this.props.createRoomInputErrors.length > 0 ? (
                                <div className="alert alert-danger w-50">
                                    <h5>These values are required</h5>
                                    <ul>
                                        {
                                            this.props.createRoomInputErrors.map(input => {
                                                return <li>{input}</li>  
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
                                <div className="alert alert-warning w-50">Processing Request...</div>
                            ) : this.props.createStatus.success ? (
                                <div className="alert alert-success w-50">Room has been created Successfully</div>
                            ) : this.props.createStatus.error ? (
                                <div className="alert alert-danger w-50">{this.props.createStatus.error}</div>
                            ) : (
                                null
                            )
                        }

                        <div className="form-group w-50">
                            <label htmlFor="roomName">Room Name:</label>
                            <input type="text" className="form-control" id="roomName" value={this.state.roomName} placeholder="Room Name" onChange={this.handleChange} />
                        </div>

                        <div className="form-group w-50">
                            <label htmlFor="deviceSn">Device Serial Number:</label>
                            <input type="text" className="form-control" id="deviceSn" value={this.state.deviceSn} placeholder="Device Serial Number" onChange={this.handleChange} />
                        </div>
                    
                        <div className="form-group w-50">
                            <label htmlFor="maxPeopleNumber">Max People Number:</label>
                            <input type="number" className="form-control" id="maxPeopleNumber" value={this.state.maxPeopleNumber} placeholder="Max People Number" onChange={this.handleChange}  />
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="currentPeopleNumber">Current People Number:</label>
                            <input type="number" className="form-control" id="currentPeopleNumber" value={this.state.currentPeopleNumber} placeholder="Current People Number" onChange={this.handleChange}  />
                        </div>

                        <button type="submit" className="btn btn-primary mr-4">Save</button>
                        <Link to="/dashboard" className="btn btn-danger text-white">Close</Link>    
                    </form>
				</section>
			</div>         
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        createRoomInputErrors: state.createRoomInputErrors,
        createStatus: state.createRoomStatus,
    }
}

const mapDispatchToState = (dispatch) =>{
    return {
        createRoom: (roomObject) => {dispatch(createRoomAction(roomObject))},
        dispatchErrors: (errorsArray) => {dispatch({type: 'CREATE_ROOM_INPUT_ERRORS', errorsArray})},
        resetErrors: () => {dispatch({type: 'RESET_CREATE_ROOM_INPUT_ERRORS'})},
        resetAlerts: () => {dispatch({type: 'RESET_CREATE_ROOM_ALERTS'})},
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AddRoom);

