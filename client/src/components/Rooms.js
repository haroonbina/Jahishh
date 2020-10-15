import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchRoomsAction, deleteRoomAction } from '../store/actions/RoomsActions'
import RoomsList from './RoomsList';

class Rooms extends Component{
    componentDidMount(){
        this.props.fetchRooms();
    }

    render(){
        return (
            
            <div className="container">
                {
                    this.props.rooms.loading ? (
                        <div className="alert alert-info text-center">Loading Rooms...</div>
                    ) : this.props.rooms.error ? (
                        <div className="alert alert-danger text-center">{this.props.rooms.error}</div>
                    ) : (
                        <RoomsList rooms={this.props.rooms.allRooms} deleteRoom={this.props.deleteRoom} />
                    )
                }        
            </div>
        )    
    }
}

const mapStateToProps = (state) =>{
    return {
        rooms: state.rooms,
    }
}

const mapDispatchToState = (dispatch) =>{
    return {
        fetchRooms: () => {dispatch(fetchRoomsAction())},
        deleteRoom: (id) => {dispatch(deleteRoomAction(id))},      
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Rooms);