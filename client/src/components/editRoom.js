import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRoomAction, updateRoomAction } from '../store/actions/RoomsActions';

class EditRoom extends Component{

    state = {
        id: null,
        room_name: '',
        device_number: '',
        max_visiter_number: null,
        current_people_number:''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        this.props.updateRoom(this.state);

        // this.setState({
        //     room_name: '',
        //     device_number: '',
        //     max_visiter_number: 0
        // })
    }

    componentDidMount(){
        const roomId = this.props.match.params.room_id;
        this.props.fetchRoom(roomId);
    }

    componentDidUpdate(){
        if(this.props.room.id != this.state.id){
            this.setState({
                id: this.props.room.id,
                room_name: this.props.room.room_name,
                device_number: this.props.room.device_number,
                max_visiter_number: this.props.room.max_visiter_number
            })
        }
    }


    render(){
        return(

            <div className="content-wrapper">
  
                {/* <!-- Content Header (Page header) --> */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Edit Room</h1>
                        </div> {/* <!-- /.col --> */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard v1</li> */}
                            </ol>
                        </div> 
                        </div>  
                    </div>
                </div>
                {/* <!-- /.content-header --> */}

                {/* <!-- Main content --> */}

                <section className="content">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group w-50">
                            <label htmlFor="roomName">Room Name</label>
                            <input type="text" className="form-control" id="room_name" value={this.state.room_name} placeholder="Enter Your Room Name" onChange={this.handleChange}/>
                        </div>

                        <div className="form-group w-50">
                            <label htmlFor="maxVisiterNumber">Max Visiter Number </label>
                            <input type="number" className="form-control" id="max_visiter_number" value={this.state.max_visiter_number} placeholder="Visiter Number" onChange={this.handleChange} />
                        </div>

                        <div className="form-group w-50">
                            <label htmlFor="deviceSerial">Device Details </label>
                            <input type="text" className="form-control" id="device_number" value={this.state.device_number} placeholder="Device Serial Number" onChange={this.handleChange} />
                        </div>
                    
                        <button type="submit" className="btn btn-primary mr-4">Save</button>
                        <Link to="/dashboard" className="btn btn-danger" onClick={this.props.closeForm}>Close</Link>    
                    </form>
                </section>
                {/* <!-- /.content --> */}
            </div>
            
       
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        room: state.editRoom,
    }
}

const mapDispatchToState = (dispatch) =>{
    return {
        fetchRoom: (id) => {dispatch(fetchRoomAction(id))},   
        updateRoom: (roomObject) => {dispatch(updateRoomAction(roomObject))},     
    }
}

export default connect(mapStateToProps, mapDispatchToState)(EditRoom);