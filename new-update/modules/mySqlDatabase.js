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
function addRoom(name,device_sn,max_people_number,current_people_number) {
    return new Promise((resolve ,reject) => {
        
         runQuery(`INSERT INTO rooms (name,device_sn,max_people_number,current_people_number) VALUES 
         ('${name}',  '${device_sn}' ,'${max_people_number}','${current_people_number}')`).then(() => {
             resolve()
             }).catch(error => {
                 reject(error)
             })
         
    })
}

function resetPassword(params) {
    
    runQuery(`UPDATE Password SET title = '${newPassowrd}' WHERE id = ${password}`)
    runQuery(password).then(() => {
        resolve()
    }).catch(error => {
        reject(error)
    })
}
module.exports = {
    checkUser,
    addRoom,
    resetPassword

    
}