import React from 'react';
import { Link } from 'react-router-dom';


const RoomsList = ({rooms}) =>{

    
    const roomsList = rooms ? (
        rooms.map(room =>{
            return (
                <div className="col col-md-3" key={room.id}>
                    <div className="card .bg-light">
                        <h5 className="card-header">{room.name}</h5>
                        <div className="card-body">
                            <p>Device S_N: {room.device_sn}</p>
                            <p>Max People Number: {room.max_people_number}</p>
                            <p>Current People Number: {room.current_people_number}</p>
                            <div className="mt-4">
                                <Link to={`/editRoom/${room.id}`} type="submit" className="btn btn-primary mr-4">Edit</Link>
                                <a className="btn btn-success text-white" id={room.id}>Active</a>
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