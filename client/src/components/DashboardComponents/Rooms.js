import React, {Component} from 'react';
import { connect } from 'react-redux';
import { deleteRoomAction, fetchRoomsAction } from '../../store/actions/RoomsActions'
import RoomsList from './RoomsList';
import DeleteConfirmationModal from './DeleteConfirmationModal';

class Rooms extends Component{
    state = {
        deleteRoomId: null,
        isOpenDeleteConfirmationModal: false
    }

    setDeleteRoomId = (id) =>{
        if(!this.props.deleteRoomStatus.loading){
            this.setState({
                isOpenDeleteConfirmationModal: true,
                deleteRoomId: id
            })
        }  
    }

    closeDeleteConfirmationModal = () =>{
        this.setState({
            deleteRoomId: null,
            isOpenDeleteConfirmationModal: false,
        })
    }

    handleDeleteRoom = () =>{
        this.setState({
            isOpenDeleteConfirmationModal: false
        })
        this.props.deleteRoom(this.state.deleteRoomId);
    } 

    componentDidMount(){
        this.props.fetchRooms();
    }

    componentDidUpdate(){
        if(this.props.deleteRoomStatus.success || this.props.deleteRoomStatus.error){
            clearTimeout(this.hideTimeout);
            this.hideTimeout = setTimeout(() =>{
                this.props.resetDeleteToast();
            }, 2000);
        }
    }

    render(){
        return (
            
            <div className="container">
                {
                    this.props.rooms.loading ? (
                        <div className="alert alert-light full-width-alert text-center">Loading Rooms...</div>
                    ) : this.props.rooms.error ? (
                        <div className="alert alert-danger full-width-alert text-center">{this.props.rooms.error}</div>
                    ) : this.props.rooms.allRooms.length > 0 ? (
                        <RoomsList rooms={this.props.rooms.allRooms} setDeleteId={this.setDeleteRoomId} />
                    ) : (
                        <div className="alert alert-light full-width-alert text-center">No Room</div>
                    )
                }
                {
                    this.state.isOpenDeleteConfirmationModal ? (
                        <DeleteConfirmationModal handleDeleteRoom={this.handleDeleteRoom} closeModal={this.closeDeleteConfirmationModal} />
                    ) : (
                        null
                    )
                }
                {
                    this.props.deleteRoomStatus.loading ? (
                        <div className="toast toast-loading">Deleting room...</div>
                    ) : this.props.deleteRoomStatus.error ? (
                        <div className="toast toast-error">{this.props.deleteRoomStatus.error}</div>
                    ) : this.props.deleteRoomStatus.success ? (
                        <div className="toast toast-success">Successfully deleted</div>
                    ) : (
                        <div className="toast"></div>
                    )
                }        
            </div>
        )    
    }
}

const mapStateToProps = (state) =>{
    return {
        rooms: state.roomsData.rooms,
        deleteRoomStatus: state.roomsData.deleteRoomStatus,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchRooms: () => {dispatch(fetchRoomsAction())},
        deleteRoom: (id) => {dispatch(deleteRoomAction(id))},
        resetDeleteToast: () =>{dispatch({type: 'RESET_DELETE_ROOM_TOAST'})}, 
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);