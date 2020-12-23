// import http from 'http'

const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "name": "test",
        "number": "2",
        "id": 5
    },
    {
        "name": "oodi",
        "number": "1",
        "id": 6
    },
    {
        "name": "p",
        "number": "2",
        "id": 8
    }
]

app.get('/', (req, res) => {
    res.send('<h1>/api/persons shows all persons</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const n = persons.length

    res.send(`
    <p>Phonebook has info for ${n} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = parseFloat(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})