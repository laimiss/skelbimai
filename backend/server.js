require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const adsRoutes = require('./routes/ads')
const userRoutes = require('./routes/user')
const commentsRoutes = require('./routes/comments')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/ads', adsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/comments', commentsRoutes)


mongoose.connect(process.env.MONGO_URL)
    .then((conn) => {
        console.log(`Prisijungė prie ${conn.connection.name} @ ${conn.connection.host}`)

        app.listen(process.env.PORT || 3000, () => {
            console.log(`Listening on port ${process.env.PORT} `)
        })
    })
    .catch((error) => {
        console.log(error)
    })




