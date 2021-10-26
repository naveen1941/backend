const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const helloRoutes = require('./router/hello')
const pingRoutes = require('./router/ping')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/hello', helloRoutes)
app.use('/ping', pingRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})