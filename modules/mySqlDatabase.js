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
                database:'fbw5_db_new'

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

function fetchRooms(){
    const query = `SELECT * FROM rooms`;

    return new Promise ((resolve, reject) => {
        runQuery(query)
        .then(result =>{
            resolve(result);
        }).catch(error =>{
            reject(error);
        })
    })
}

function fetchRoom(room_id){
    const query = `SELECT * FROM rooms WHERE id = ${room_id}`;

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
    fetchRooms,
    fetchRoom

}