const express = require('express')
const bookRouter = require('./routes/books')

const app = express()

app.use(express.json)

app.use((req, res, next) => {
    const startedAt = new Date
    res.on('finish', () => {
        console.log(`${startedAt.toISOString()} - ${req.method} ${req.originalUrl}`)
    })

    next()
})

app.get('/', (req, res) => {
    res.json({message: "Hello, world"})
})

app.use('/api/books', bookRouter)

app.use((req, res) => {
    res.status(404).json({error: `Маршрут ${req.originalUrl}
    не найден`})
})

module.exports = app