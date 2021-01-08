import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // const newAnecdote = await anecdoteService.createNew(content)
        // dispatch(addAnecdote(newAnecdote))
        dispatch(addAnecdote(content))
        dispatch(notification(`'${content}' added.`))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm