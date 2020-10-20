const express = require('express');
const { fetchUser } = require('../database/mySql');

const router = express.Router();


router.post('/admins/login', (req, res) =>{
    const {userName, password} = req.body;

    fetchUser(userName, password)
    .then(res =>{
        
    }).catch(err =>{

    })
})



module.exports = router;