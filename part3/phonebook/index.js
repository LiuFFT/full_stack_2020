require('dotenv').config()

// express
const express = require('express')
const app = express()
app.use(express.json())

//front end deployed
app.use(express.static('build'))

const Person = require('./models/person')

//morgan
const morgan = require('morgan');
morgan.token('json', function (req) { return JSON.stringify(req.body)})
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))


//cors
const cors = require('cors')
app.use(cors())


// app.get('/', (req, res) => {
//     res.send('<h1>/api/persons shows all persons</h1>')
// })

app.get('/api/persons', (req, res) => {
    Person.find().then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(p => {
        response.json(p)
    })

})

app.get('/info', (req, res) => {
    Person.find().then(persons => {
        const result = `
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${new Date()}</p>
            `
        res.send(result)
    })
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


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})