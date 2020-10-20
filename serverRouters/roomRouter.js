const express = require('express');
const {createRoom, fetchRooms, fetchRoomForUpdate, updateRoom} = require('../database/mySql');

const router = express.Router();


router.post('/rooms/createRoom', (req, res) => {

    const {roomName, deviceSn, maxPeopleNumber, currentPeopleNumber} = req.body;
    
    createRoom(roomName, deviceSn, maxPeopleNumber, currentPeopleNumber)
    .then(result =>{
        res.send();
    }).catch(error=>{
        res.status(400).send(error)
    })
});

router.get('/rooms', (req, res) =>{

    fetchRooms()
    .then(result =>{
        res.send(result);
    }).catch(error =>{
        res.status(400).send();
    })
})

router.get('/rooms/:id', (req, res) =>{
    
    fetchRoomForUpdate(req.params.id)
    .then(result =>{
        res.send(result);
    }).catch(error =>{
        console.log(error);
    })    
})

router.put('/rooms/update', (req, res) =>{

    const {id, roomName, deviceSn, maxPeopleNumber, currentPeopleNumber} = req.body;

    updateRoom(id, roomName, deviceSn, maxPeopleNumber, currentPeopleNumber)
    .then(result =>{
        res.send();
    }).catch(error =>{
        res.status(400).send();
    })
})

module.exports = router;