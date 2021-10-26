const express = require('express')
const app = express()
const port = 3000

const helloRoutes = require('./router/hello')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/hello', helloRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})