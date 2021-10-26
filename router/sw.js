const express = require('express')
const router = express.Router()
const axios = require('axios').default;

router.get('/chars-remote', async function (req, res) {
    // TODO: potential problems
    // external might go down
    // throttle..
    // url is hard-coded
    // code structure
    // assert response format
    let url = 'http://swapi.dev/api/people';
    let resData = [];
    while(url){
        const resp = await swPaginationHelper(url)
        if(resp.error) {
            return res.status(500).send({error: "Unknown error " + error})
        }
        resData = resData.concat(resp.data)
        url = resp.next
    }
    res.send({msg: "success", names: resData});
})

async function swPaginationHelper(url) {
    try {
        const response = await axios.get(url)
        if (response.status === 200) {
            const resData = response.data.results.map( it => it.name)
            return {data: resData, next: response.data.next}
        } else {
            return {error: new Error('External service call failed')}
        }
    } catch (error) {
        return {error}
    }
}

module.exports = router