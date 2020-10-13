const express = require('express');
const fs = require('fs')
const session = require('express-session')
const fileupload = require('express-fileupload')
const cors = require('cors')

const port = process.env.PORT || 9000
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

app.post('/addroom', (req, res) => {

    // responses map
    // 1 room saved successfuly
    // 2 data error
    // 3 roomtitle is exist
    // 4 server side error
//console.log(Object.keys( req.files));
if (req.files) {


const name = req.body.rooms
const device_sn = req.body.deviceSerial_no
const max_people_number = req.body.max_people_number
const current_people_number = req.body.current_people_number


if (name && device_sn && max_people_number && current_people_number ){
    
    dataModule.addRoom(name, device_sn,max_people_number,current_people_number ).then(() => {
        res.json(1)
    }).catch(error => {
        if (error == 3) {
            res.json(3)
        } else {
            res.json(4)
        }
    })

} else {
    res.json(2)
}
} else {
    res.json(2)
}

})

app.post('/changepassword', (req, res) => {
    console.log(req.body);
});
app.post('/logout', (req, res) => {
    req.session.destroy()
    res.json(10)
})
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});