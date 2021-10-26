const express = require('express')
const router = express.Router()

router.post('/', function (req, res) {
    if(!req.body || !req.body.msg) {
        return res.status(400).send({error: "Invalid payload"})
    }
    res.send({...req.body, stamp: new Date()});
})

module.exports = router