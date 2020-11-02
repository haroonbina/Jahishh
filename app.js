const express = require('express');
const session = require('express-session');
const cors = require('cors');
const fileupload = require('express-fileupload');
const roomRouter = require('./serverRouters/roomRouter');
const adminRouter = require('./serverRouters/adminRouter');

const {fetchRooms, setConnected, setCurrentNumber} = require('./database/mySql')


const port = process.env.PORT || 8000
const app = express()


app.use(express.static(__dirname + '/client'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(session({
    name:"sid",
    resave: false,
    saveUninitialized: false,
    secret: "hmca/sd",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "lax"
    }
}))

app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))


app.use(adminRouter);
app.use(roomRouter);


const server = app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});




const io = require('socket.io')(server)
io.on('connection', (socket) => {
    socket.join('main')
    fetchRooms().then(rooms => {
        //console.log(rooms);
        socket.emit('rooms', rooms)
    })
    socket.on('rooms', (rooms) => {
        socket.broadcast.to('main').emit('rooms', rooms)
    })
    socket.on('set_alarm', data => {
        socket.broadcast.to('main').emit('set_alarm', data)
    })
    socket.on('setConnected', (data) => {
        socket.broadcast.to('main').emit('setConnected', data)
    })
    io.on('disconnect', () => {
        socket = null;
    })

})



const socket = require('socket.io-client')('http://localhost:8000')
socket.on('connect', () => {
})
fetchRooms().then(rooms => {
    const Transmiter = require('./modules/transmeter')

    const radio = new Transmiter()

    radio.setReadingPipe('0xABCDABCD71')
    //radio.setWritingPipe('0x744d52687C')
    radio.begin()


    socket.on('set_alarm', data => {
        rooms[rooms.map(room => room.device_sn).indexOf(data.sn)].door_sound_alarm = data.status
        radio.send("alarm-" + data.status, 10, data.sn).then(() => {
            console.log('alarm sat for ' + data.sn);

        }).catch(error => {
            console.log('alarm could not be set for ' + data.sn);

        })
    })

    radio.read((data => {
        console.log(data);
        // check device is started and set communication token to it
        if (data.indexOf('hi') > 0) {
            const deviceSn = data.substr(0, data.lastIndexOf('-'))
            //console.log(deviceSn);
            const device = rooms.find(device => device.device_sn === deviceSn)
            // console.log(device);
            if (device) {
                rooms[rooms.map(device => device.id).indexOf(device.id)].connected = true
                setConnected(device.id, true).then(result => {
                        socket.emit("rooms", rooms)
                    radio.send("people-" + device.current_people_number + "," + device.max_people_number + "." + (device.door_sound_alarm ? "1" : "0"), 10, device.device_sn).then(() => {

                    }).catch(error => {
                        console.log(error);
                    })

                }).catch(error => {
                    console.log(error);
                })


            }
        }
        if (data.indexOf('yup') > 0) {
            const deviceSn = data.substr(0, data.lastIndexOf('-'))
            //console.log(deviceSn);
            const device = rooms.find(device => device.device_sn === deviceSn)
            // console.log(device);
            if (device) {
                rooms[rooms.map(device => device.id).indexOf(device.id)].connected = true
                setConnected(device.id, true).then(result => {
                        socket.emit("rooms", rooms)


                }).catch(error => {
                    console.log(error);
                })


            }
        }
        if (data.indexOf('data') > 0) {
            const deviceSn = data.substr(0, data.lastIndexOf('-'))
            const device = rooms.find(device => device.device_sn === deviceSn)
            if (device) {
                const currentNum = data.substr(data.lastIndexOf(',') + 1, data.length)
                rooms[rooms.map(device => device.id).indexOf(device.id)].connected = true
                rooms[rooms.map(device => device.id).indexOf(device.id)].current_people_number = currentNum.replace(/\x00/gi, '').trim()
                setCurrentNumber(device.id, currentNum.replace(/\x00/gi, '').trim()).then(result => {
                        socket.emit("rooms", rooms)
                }).catch(error => {
                    console.log(error);
                })


            }
        }

    }))

    setInterval(() => {

        recursiveCheckConnection()

        //rooms.length
    }, rooms.length * 1000);

    function recursiveCheckConnection(i) {
        if(i == undefined){
            i = 0
        }
        if (i < rooms.length){
            checkConnected(rooms[i], i).then(() => {
                recursiveCheckConnection(i+1)
            }).catch(() => {
                recursiveCheckConnection(i+1)
            })
        }
    }


    function checkConnected(device, idx) {
        //rooms = rooms.map(room => {room.connected = false; return room})
        return new Promise((resolve, reject) => {
            //radio.setWritingPipe(rooms.device_sn)
            radio.send("hi", 10, device.device_sn).then(() => {
                setConnected(device.id, true).then(result => {
                    if (rooms[rooms.map(device => device.id).indexOf(device.id)].connected != true) {
                        rooms[rooms.map(device => device.id).indexOf(device.id)].connected = true
                        // if(socket)
                        socket.emit('setConnected', {roomid: device.id, connected: true})
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                //console.log(idx);
                setConnected(device.id, false).then(result => {
                    if (rooms[rooms.map(device => device.id).indexOf(device.id)].connected != false) {
                        rooms[rooms.map(device => device.id).indexOf(device.id)].connected = false
                        // if(socket)
                        socket.emit('setConnected', {roomid: device.id, connected: false})
                    }
                    resolve()

                }).catch(error => {
                    reject(error)
                })
            })
        })

    }
})