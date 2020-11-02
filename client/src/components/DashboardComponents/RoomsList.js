import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
// import { FiBell, FiBellOff } from 'react-icons/fi';
import { updateRoomAction, setRoomsAction } from '../../store/actions/RoomsActions';



const RoomsList = ({rooms, setDeleteId, updateRoom, setRooms, socket}) =>{
const changeAlarm = (room) => {
    const roomObject = {
        id: room.id,
        roomName: room.name,
        deviceSn: room.device_sn,
        maxPeopleNumber: room.max_people_number,
        currentPeopleNumber: room.current_people_number,
        door_sound_alarm: room.door_sound_alarm === 1 ? 0 : 1
    }
updateRoom(roomObject)
room.door_sound_alarm = room.door_sound_alarm === 1 ? 0 : 1
rooms[rooms.map(room => room.id).indexOf(room.id)] = room
setRooms(rooms)
socket.emit('set_alarm', {sn: room.device_sn, status: room.door_sound_alarm})
}


    const roomsList = rooms ? (
        rooms.map(room =>{
            const lightColor = room.connected ? ("bg-success") : ("bg-danger"); 
            return (
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-5" key={room.id}>
                    <div className="card">
                        <div className="card-header">
                            <div>{room.name}</div>
                            <div className={`light ${lightColor}`}></div>
                        </div>
                        <div className="card-body">
                            <p className="room-info">Device S_N: {room.device_sn}</p>
                            <p className="room-info">Max People Number: {room.max_people_number}</p>
                            <p className="room-info">Current People Number: {room.current_people_number}</p>
                            <div className="d-flex align-items-center">
                                <div className="mr-3">
                                    Alarm:
                                </div>
                                <label className="switch">
                                    <input onChange={ () => {changeAlarm(room)}} className="switch-input" type="checkbox" checked={room.door_sound_alarm === 1} />
                                    <span className="switch-label" data-on="On" data-off="Off"></span> <span className="switch-handle"></span>
                                </label> 
                            </div>
                            <div className="mt-4 d-flex justify-content-between">
                                <div>
                                    <Link to={`/editRoom/${room.id}`}><MdModeEdit className="room-control-icon room-edit" /></Link>
                                    <FaRegTrashAlt id={room.id} className="room-control-icon room-delete" onClick={(e) =>{setDeleteId(e.target.id || e.target.parentNode.id)}} />
                                    <AiOutlineSetting id={room.id} className="room-control-icon room-setting" />
                                </div>
                                {/* <FiBell className="room-control-icon text-success" />
                                <FiBellOff className="room-control-icon text-danger" /> */}
                            </div>            
                        </div>
                    </div>
                </div>
            )
        })
    ) : (
        null
    ) 

    return (
        <div className="row">
            {roomsList}
        </div>
    )
}


const mapDispatchToProps = (dispatch) =>{
    return {
        updateRoom: (roomObject) => {dispatch(updateRoomAction(roomObject))},
        setRooms: (rooms) => {dispatch(setRoomsAction(rooms))}
    }
}
const mapStateToProps = (state) =>{
	return{
		
		socket: state.roomsData.socket,
		allRooms: state.roomsData.rooms
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);