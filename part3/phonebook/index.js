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



app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
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


    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savePerson => {
        response.json(savePerson)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})