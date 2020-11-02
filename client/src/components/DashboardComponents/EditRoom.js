import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import DashboardSideNav from './DashboardSideNav';
import { fetchRoomForUpdateAction, updateRoomAction } from '../../store/actions/RoomsActions';

class EditRoom extends Component{

    state = {
        id: null,
        roomName: '',
        deviceSn: '',
        maxPeopleNumber: 0,
        currentPeopleNumber: 0
    }

    handleChange = (e) =>{
        this.props.resetAlerts();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        if(!this.props.updateStatus.loading){
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

            this.props.updateRoom(this.state);
        }
    }

    componentDidMount(){
        const roomId = this.props.match.params.room_id;
        this.props.fetchRoom(roomId);
    }

    componentDidUpdate(){
        if(this.props.room.id !== this.state.id){
            this.setState({
                id: this.props.room.id,
                roomName: this.props.room.name,
                deviceSn: this.props.room.device_sn,
                maxPeopleNumber: this.props.room.max_people_number,
                currentPeopleNumber: this.props.room.current_people_number
            })
        }

        clearTimeout(this.hideTimeout);
        if(this.props.updateStatus.success || this.props.updateStatus.error){
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
                
                <div className="editRoom-content container-fluid">
                    <div className="row">
                        <DashboardSideNav />
                        <div className="editRoom-main-content col col-md-9 col-xl-10 pb-5">
                            <h5 className="editRoom-main-content-title p-3 mb-1">Edit Room</h5>
                            <form className="p-4" onSubmit={this.handleSubmit}>
                                {
                                    this.props.updateRoomInputErrors.length > 0 ? (
                                        <div className="alert alert-danger">
                                            <h5>These values are required</h5>
                                            <ul>
                                                {
                                                    this.props.updateRoomInputErrors.map((input, index) => {
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
                                    this.props.updateStatus.loading ? (
                                        <div className="alert alert-warning">Processing Request...</div>
                                    ) : this.props.updateStatus.success ? (
                                        <div className="alert alert-success">Room has been updated successfully</div>
                                    ) : this.props.updateStatus.error ? (
                                        <div className="alert alert-danger">{this.props.updateStatus.error}</div>
                                    ) : (
                                        null
                                    )
                                }

                                <div className="form-group">
                                    <label htmlFor="roomName">Room Name</label>
                                    <input type="text" className="form-control" id="roomName" value={this.state.roomName} placeholder="Room Name" onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="deviceSn">Device Serial Number</label>
                                    <input type="text" className="form-control" id="deviceSn" value={this.state.deviceSn} placeholder="Device Serial Number" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="maxPeopleNumber">Max Visiter Number</label>
                                    <input type="number" className="form-control" id="maxPeopleNumber" value={this.state.maxPeopleNumber} placeholder="Max People Number" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="currentPeopleNumber">Current People Number</label>
                                    <input type="number" className="form-control" id="currentPeopleNumber" value={this.state.currentPeopleNumber} placeholder="Current People Number" onChange={this.handleChange} />
                                </div>

                                <button type="submit" className="btn btn-primary mr-4">Save</button>
                                <Link to="/dashboard" className="btn btn-danger" onClick={this.props.closeForm}>Close</Link>    
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
        room: state.roomsData.roomForEdit,
        updateRoomInputErrors: state.roomsData.updateRoomInputErrors,
        updateStatus: state.roomsData.updateRoomStatus,
        user: state.userData.user,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchRoom: (id) => {dispatch(fetchRoomForUpdateAction(id))},   
        updateRoom: (roomObject) => {dispatch(updateRoomAction(roomObject))},
        dispatchErrors: (errorsArray) => {dispatch({type: 'UPDATE_ROOM_INPUT_ERRORS', errorsArray})},
        resetErrors: () => {dispatch({type: 'RESET_UPDATE_ROOM_INPUT_ERRORS'})},
        resetAlerts: () => {dispatch({type: 'RESET_UPDATE_ROOM_ALERTS'})},   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoom);