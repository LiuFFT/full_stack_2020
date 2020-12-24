// express
const express = require('express')
const app = express()
app.use(express.json())

//front end deployed
app.use(express.static('build'))



//morgan
const morgan = require('morgan');
morgan.token('json', function (req) { return JSON.stringify(req.body)})
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))


//cors
const cors = require('cors')
app.use(cors())


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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
const generateId = () => {
    const uid = getRandomInt(99999)
    return uid
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    // const uid = generateId()

    const personExist = persons.find(person => person.name === body.name)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }else if (personExist){
        return response.status(400).json({
            error: `name must be unique, ${body.name} already exist`
        })
    }

    const person = {
        name: body.name,
        number: body.number ,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})