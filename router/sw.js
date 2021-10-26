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
        const url = 'http://swapi.dev/api/people';
        let resData = await swGetAllPagesData(url);
        res.send({msg: "success", names: resData.map(it => it.name)});
    }

    await tryOrFailSilently(res, operation)
})

router.get('/starships-best', async function (req, res) {
    const operation = async () => {
        const url = 'http://swapi.dev/api/starships';
        const resData = await swGetAllPagesData(url);
        const hasMaxPilots = resData.map( it => it.pilots ).sort( (a,b) => a.length - b.length ).reverse()
        res.send({msg: "success", names: hasMaxPilots[0]});
    }
    await tryOrFailSilently(res, operation)
});

async function tryOrFailSilently(res, operation) {
    try {
        await operation()
    } catch (error) {
        return res.status(500).send({error: "Unknown error " + error})
    }
}


async function swGetAllPagesData(url) {
    let resData = [];
    while(url){
        const resp = await swPaginationHelper(url)
        resData = resData.concat(resp.data)
        url = resp.next
    }
    return resData
}

async function swPaginationHelper(url) {
    const response = await axios.get(url)
    if (response.status === 200) {
        const resData = response.data.results;
        return {data: resData, next: response.data.next}
    } else {
        throw new Error('External service call failed');
    }
}

module.exports = router