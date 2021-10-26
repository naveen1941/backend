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
    const operation = async () => {
        let url = 'http://swapi.dev/api/people';
        let resData = [];
        while(url){
            const resp = await swPaginationHelper(url)
            resData = resData.concat(resp.data)
            url = resp.next
        }
        res.send({msg: "success", names: resData});
    }

    await tryOrFailSilently(res, operation)
})

async function tryOrFailSilently(res, operation) {
    try {
        await operation()
    } catch (error) {
        return res.status(500).send({error: "Unknown error " + error})
    }
}

async function swPaginationHelper(url) {
    const response = await axios.get(url)
    if (response.status === 200) {
        const resData = response.data.results.map( it => it.name)
        return {data: resData, next: response.data.next}
    } else {
        throw new Error('External service call failed');
    }
}

module.exports = router