const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.password || !body.username){
        return response.status(400).send({
            error: 'must include username and password'
        })
    }else if (body.password.length<3 || body.username.length<3){
        return response.status(400).send({
            error: 'The length of username and password must be at least 3'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs',{title: 1, author: 1, url: 1, likes: 1})
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const users = await User
        .findById(request.params.id).populate('blogs',{title: 1, author: 1, url: 1, likes: 1})
    response.json(users)
})

module.exports = usersRouter