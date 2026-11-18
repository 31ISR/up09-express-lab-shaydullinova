const express = require('express')

const router = express.Router()

let books = [
    {
        id: "1",
        title: "Мастер и Маргарита",
        year: 1967,
        author: "Михаил Булгаков",

    }, 
    {
        id: "2",
        title: "Гарри Поттер и философский камень",
        year: 1997,
        author: "Дж. К. Роулинг",

    }, 
    {
        id: "3",
        title: "Дюна",
        year: 1965,
        author: "Фрэнк Герберт",

    }
]

router.get('/', (req, res) => {
    res.json(books)
})

router.post("/", (req, res) => {
    const { title, author, year } = req.body

    const book = {
        id: Date.now(),
        title: title.trim(),
        year: year,
        author: author.trim()
    }

    books.push(book)

    res.status(201).json(book)
})

// TODO: найдите товар по id и верните его

// TODO: обновите товар по id

// TODO: удалите товар по id

module.exports = router