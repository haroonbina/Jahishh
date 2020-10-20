import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchRoomsAction } from '../../store/actions/RoomsActions'
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
                        <div className="alert alert-light text-center">Loading Rooms...</div>
                    ) : this.props.rooms.error ? (
                        <div className="alert alert-danger text-center">{this.props.rooms.error}</div>
                    ) : (
                        <RoomsList rooms={this.props.rooms.allRooms} />
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
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Rooms);