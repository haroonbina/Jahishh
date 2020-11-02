const mySql = require('mysql')
const fs = require('fs')
const passwordHash = require('password-hash')

let con = null

function connect() {
    return new Promise((resolve, reject) => {
        if (con) {
            if (con.state === 'disconnected') {
                con.connect(error => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }

                }).catch(error => {
                    reject(error)
                })
            } else {
               resolve() 
            }
        } else{
            con = mySql.createConnection({
                multipleStatements:true,
                host:'localhost',
                port:3306,
                user:'root',
                password:'',
                database:'smart_door'

            })
            con.connect(error =>{
                if (error) {
                    reject(error)
                } else {
                   resolve() 
                }
            })
        }
    })
}
function runQuery(queryString){
    return new Promise ((resolve, reject) => {
        connect().then(() => {
            con.query(queryString,(error, result, fields) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        }).catch(error =>{
            reject(error)
        })
    })
}

function checkUser(admin, pass) {
    
    return new Promise((resolve, reject) => {
        // any result from SELECT query will be return as an array (empty array or array with one element or array with many elements)
        runQuery(`SELECT * FROM configuration where name like 'username' OR name like 'password'`).then(result => {
            console.log(result)
            const username = result.find(element => element.name === 'username').value
            const password = result.find(element => element.name === 'password').value
            if (username === admin && pass === password) {
                resolve(username)
            } else {
                reject(3)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

function fetchUser(userName, password) {
    const query = `SELECT * FROM admins where name= '${userName}' AND password= '${password}'`

    return new Promise((resolve, reject) => {
        runQuery(query)
        .then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

function fetchUserByID(id) {
    const query = `SELECT * FROM admins WHERE id= ${id}`;

    return new Promise((resolve, reject) => {
        runQuery(query)
        .then(result => {
            resolve(result);
        }).catch(error => {
            reject(error);
        })
    })
}

function changePassword(userId, currentPassword, newPassword) {
    const query = `UPDATE admins SET password='${newPassword}' WHERE id= ${userId} AND password='${currentPassword}'`;

    return new Promise((resolve, reject) => {
        runQuery(query)
        .then(result => {
            resolve(result);
        }).catch(error => {
            console.log(error)
            reject(error);
        })
    })
}

function createRoom(roomName, deviceSn, maxPeopleNumber, currentPeopleNumber){
    
    const query = `INSERT INTO rooms (name, device_sn, max_people_number, current_people_number) VALUES ('${roomName}', '${deviceSn}',${maxPeopleNumber},'${currentPeopleNumber}')`;
    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}

function fetchRooms(){

    const query = "SELECT * FROM rooms";

    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}

function fetchRoomForUpdate(roomId){

    const query = `SELECT * FROM rooms WHERE id = ${roomId}`;

    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}

function updateRoom(id, roomName, deviceSn, maxPeopleNumber, currentPeopleNumber, door_sound_alarm){

    const query = `UPDATE rooms SET name= '${roomName}', device_sn= '${deviceSn}', max_people_number = ${maxPeopleNumber} , current_people_number = ${currentPeopleNumber} ${door_sound_alarm !== undefined? ', door_sound_alarm = ' + door_sound_alarm : ''} WHERE id = ${id}`;

    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}

function deleteRoom(roomId){

    const query = `DELETE FROM rooms WHERE id = ${roomId}`;

    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}

function setConnected(roomid, connected) {
    const query = `UPDATE rooms SET connected = ${connected} WHERE id = ${roomid}`
    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}
function setCurrentNumber(roomid, peopleNum) {
    const query = `UPDATE rooms SET connected = 1, current_people_number = ${peopleNum} WHERE id = ${roomid}`
    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}

function setAllUnConnected() {
    const query = `UPDATE rooms SET connected = 0 `
    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}

module.exports = {
    checkUser,
    runQuery,
    createRoom,
    fetchRooms,
    fetchRoomForUpdate,
    updateRoom,
    deleteRoom,
    fetchUser,
    fetchUserByID,
    changePassword,
    setAllUnConnected,
    setCurrentNumber,
    setConnected
}