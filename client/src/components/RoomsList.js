import React from 'react';
import { Link } from 'react-router-dom';


const RoomsList = ({rooms, showForm, deleteRoom}) =>{

    
    const roomsList = rooms ? (
        rooms.map(room =>{
            return (
                <div className="col col-md-3">
                    <div className="card .bg-light" key={room.id}>
                        <h5 className="card-header">{room.room_name}</h5>
                        <div className="card-body">
                            <p>Device Number: {room.device_number}</p>
                            <p>Max Visitor Number: {room.max_visiter_number}</p>
                            <p>Current People Number: {room.current_people_number}</p>
                            <div className="mt-4">
                                <Link to={`/editRoom/${room.id}`} type="submit" className="btn btn-primary mr-4">Edit</Link>
                                <a className="btn btn-success" id={room.id}>Active</a>
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

export default RoomsList;