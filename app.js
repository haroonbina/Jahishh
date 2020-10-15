const express = require('express');
const fs = require('fs')
const session = require('express-session')
const fileupload = require('express-fileupload')
const cors = require('cors')
const {runQuery, fetchRooms, fetchRoom} = require('./modules/mySqlDatabase')

const port = process.env.PORT || 8000
const app = express()

const dataModule = require('./modules/mySqlDatabase')

app.use(express.static(__dirname + '/client'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
const sessionOptions = {
    secret: 'Dashboard',
    cookie: {}
}
app.use(session(sessionOptions))
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))

app.post('/checkuser', (req, res) => {
    // 1 login success
    // 2 missing entries
    // 3 username or password is wrong
    // 4 server error
    console.log(req.body);
    if (req.body.admin && req.body.password) {
        dataModule.checkUser(req.body.admin.trim(),req.body.password).then((username) =>{
            req.session.user = username
            res.json(1)
        }).catch(error =>{
            if (error == 3) {
                res.json(3)
            } else {
                res.json(4)
            }
        })
     } else {
         res.json(2)
     }
});



app.post('/rooms/createRoom', (req, res) => {
    const {room_name, device_number,max_visiter_number,current_people_number} = req.body;
    const query = `INSERT INTO rooms (room_name, device_number, max_visiter_number,current_people_number) VALUES ('${room_name}', '${device_number}',${max_visiter_number},'${current_people_number}')`
    
    runQuery(query).then(result =>{
        res.send({id: result.insertId});
    }).catch(error=>{
        res.status(400).send(error)
    })
});

app.get('/rooms', (req, res) =>{

    fetchRooms()
    .then(result =>{
        res.send(result);
    }).catch(error =>{
        console.log(error);
    })
})

app.get('/rooms/:id', (req, res) =>{
    
    fetchRoom(req.params.id)
    .then(result =>{
        res.send(result);
    }).catch(error =>{
        console.log(error);
    })    
})

app.put('/rooms/update', (req, res) =>{
    const {id, room_name,device_number,max_visiter_number,current_people_number} = req.body;

    const query = `UPDATE rooms SET room_name = '${room_name}', device_number = '${device_number}', max_visiter_number = ${max_visiter_number} , current_people_number = ${current_people_number} WHERE id = ${id}`;
    runQuery(query)
    .then(result =>{
        console.log(result);
        
    }).catch(error =>{
        console.log(error);
    })
})

app.delete('/rooms/delete/:id', (req, res) =>{
    const query = `DELETE FROM rooms WHERE id = ${req.params.id}`;
    runQuery(query)
    .then(result =>{
        res.send();
    }).catch(error =>{
        console.log(error);
    })
})


// export const editRoomPost = (roomName, deviceSerial, maxVisiterNumber) => {
//     return new Promise((resolve, reject) => {
//         const fd = new FormData()
//         fd.append('roomName', roomName)
//         fd.append('deviceSerial', deviceSerial)
//         fd.append('maxVisiterNumber', maxVisiterNumber)
//         for (let i = 0; i < booknewImgs.length; i++) {
//             fd.append('bookImg' + i, booknewImgs[i])
//         }
//         if (bookPdf) {
//             fd.append('bookPdf', bookPdf)
//         }
//         fd.append('bookDescription', bookDescription)
//         fetch('/admin/editbook', {
//             method: 'POST',
//             body: fd
//         }).then(response => {
//             if(response.status === 200) {
//                 response.json().then(data => {
//                     resolve(data)
//                 }).catch(error => {
//                     reject(error)
//                 })
//             } else {
//                 reject(new Error('can not get the data, response number is: ' + response.status))
//             }
//         }).catch(error => {
//             reject(error)
//         })
//     })
// }



app.use('/', (req, res, next) => {
    const html = fs.readFileSync(__dirname,'/index.html','utf-8')
    res.send((html));
});
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});

