import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRoomAction } from '../store/actions/RoomsActions'

class AddRoom extends Component{

    state = {
        room_name: '',
        device_number: '',
        max_visiter_number: 0,
        current_people_number: 0
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        this.props.resetErrors();
        const errors = [];

        if(!this.state.room_name){
            errors.push('* Room Name');
        }
        if(!this.state.device_number){
            errors.push('* Device Number');
        }
        if(!this.state.max_visiter_number){
            errors.push('* Max Visiter Number');
        }
        if(!this.state.current_people_number){
            errors.push('* Current Visiter Number');
        }

        if(errors.length > 0){
            return this.props.dispatchErrors(errors)
        }

        this.props.createRoom(this.state);

        this.setState({
            room_name: '',
            device_number: '',
            max_visiter_number: 0,
            current_people_number: 0
        })
    }


    render(){
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
                    <form className="bg-white p-3" onSubmit={this.handleSubmit}>
                        {
                            this.props.createStatus.fieldsError.length > 0 ? (
                                <div className="bg-wight w-50">
                                    <h5>These fields are required</h5>
                                    <ul>
                                        {
                                            this.props.createStatus.fieldsError.map(input => {
                                                
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
                                <p className="bg-warning">Processing Request</p>
                            ) : this.props.createStatus.success ? (
                                <p className="bg-success">Success</p>
                            ) : this.props.createStatus.error ? (
                                <p className="bg-danger">Error creating room</p>
                            ) : (
                                null
                            )
                        }

                        <div className="form-group w-50">
                            <label htmlFor="roomName">Room Name</label>
                            <input type="text" className="form-control" id="room_name" value={this.state.room_name} placeholder="Enter Your Room Name" onChange={this.handleChange} />
                        </div>

                        <div className="form-group w-50">
                            <label htmlFor="deviceSerial">Device Details </label>
                            <input type="text" className="form-control" id="device_number" value={this.state.device_number} placeholder="Device Serial Number" onChange={this.handleChange} />
                        </div>
                    
                        <div className="form-group w-50">
                            <label htmlFor="maxVisiterNumber">Max Visiter Number </label>
                            <input type="number" className="form-control" id="max_visiter_number" value={this.state.max_visiter_number} placeholder="Visiter Number" onChange={this.handleChange}  />
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="currentPeopleNumber">Current People Number </label>
                            <input type="number" className="form-control" id="current_people_number" value={this.state.current_people_number} placeholder="Current People Number" onChange={this.handleChange}  />
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
        createStatus: state.createRoom,
    }
}

const mapDispatchToState = (dispatch) =>{
    return {
        createRoom: (roomObject) => {dispatch(createRoomAction(roomObject))},
        resetErrors: () => {dispatch({type: 'RESET_ERRORS'})},
        dispatchErrors: (errorArray) => {dispatch({type: 'FIELDS_ERROR', errorArray})},
    }
}

export default connect(mapStateToProps, mapDispatchToState)(AddRoom);

