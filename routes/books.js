const express = require('express')

const router = express.Router()

let books = [
    {
        id: "1",
        title: "Мастер и Маргарита",
        year: 1967,
        author: "Михаил Булгаков",
        isRead: false

    }, 
    {
        id: "2",
        title: "Гарри Поттер и философский камень",
        year: 1997,
        author: "Дж. К. Роулинг",
        isRead: false

    }, 
    {
        id: "3",
        title: "Дюна",
        year: 1965,
        author: "Фрэнк Герберт",
        isRead: true
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

router.get("/:id", (req, res) => {
    const book = books.find(el => el.id == req.params.id)
    if (!book) return res
    .status(404)
    .json({error: `Книга с id: ${req.params.id} не была найдена`
    })

    res.json(book)
})

router.patch("/:id", (req, res) => {
    const bookIndex = books.findIndex(
        el => el.id == req.params.id
    )

    if (bookIndex === -1) return res
    .status(404)
    .json({error: `Книга с id: ${req.params.id} не была найдена`
    })

    books[bookIndex] = { ...books[bookIndex], ...req.body }
    res.json(books[bookIndex])
})

router.delete("/:id", (req, res) => {
    const book = books.find(el => el.id == req.params.id)

    if (!book) return res
    .status(404)
    .json({error: `Книга с id: ${req.params.id} не была найдена`
    })

    books = books.filter(el => el.id != req.params.id)
    res.status(204).end()
})

module.exports = router