const express = require('express')
const router = express.Router()
const axios = require('axios').default;

router.get('/chars-remote', function (req, res) {
    // TODO: potential problems
    // external might go down
    // throttle..
    // url is hard-coded
    // code structure
    axios.get('http://swapi.dev/api/people')
        .then(function (response) {
            if (response.status === 200) {
                const resData = response.data.results.map( it => it.name)
                res.send({msg: "success", names: resData});
            } else {
                return res.status(400).send({error: "Remote server is failed"})
            }
        })
        .catch(function (error) {
            return res.status(500).send({error: "Unknown error " + error})
        })
})

module.exports = router