const express = require('express')
const fs = require('fs')
const session = require('express-session')
const fileupload = require('express-fileupload')

const dataModule = require('./modules/mongooseDataModule')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
const sessionOptions = {
    secret: 'bookStore',
    cookie: {}
}
app.use(session(sessionOptions))
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))
const port = process.env.PORT || 5000

app.post('/login', (req, res) => {
    // 1 login success
    // 2 servererror
    // 3 password is wrong
    // 4 user not exist
    if (req.body.email && req.body.password) {
        dataModule.checkUser(req.body.email.trim(), req.body.password).then(user => {
            req.session.user = user
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
    
});

app.post('/register', (req, res) => {
    // your post register handler here
    // console.log(req.body)
    // 2 data error
    // 1 user registered successfuly
    // 3 user is exist
    // 4 server error
    const email = req.body.email.trim()
    const password = req.body.password
    const repassword = req.body.repassword
    console.log(req.body);
    if (email && password && password == repassword){
        dataModule.registerUser(email, password).then(() => {
            res.json(1)
        }).catch(error => {
            console.log(error);
            if (error == "exist") {
                res.json(3)
            } else {
                res.json(4)
            }
        })
    } else{
            res.json(2)
        }
    
});


app.post('/getallbooks', (req, res) => {
    dataModule.getAllBooks().then(books => {
        res.json(books)
    }).catch(error => {
        res.json(2)
    })
});

app.post('/getbook', (req, res) => {
    const bookId = req.body.id
    
    dataModule.getBook(bookId).then(data => {
        if (!req.session.user) {
            data.pdfUrl = null
        }
        res.json(data)
    }).catch(error => {
        res.json(2)
    })
});

app.post('/checklogin', (req, res) => {
    if(req.session.user){
        res.json(req.session.user.email)
    } else{
        res.json(10)
    }
});

app.use('/admin', adminRoutes);

app.use('/', (req, res) => {
    const html = fs.readFileSync(__dirname + '/index.html' , 'utf-8')
    res.send(html);
})


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
