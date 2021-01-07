import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {votes,addAnecdote} from "./reducers/anecdoteReducer";

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(votes(id))
    }

    const addAnecdotes = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
    }

    const anecdotesSorted = [...anecdotes]
    anecdotesSorted.sort((a, b) => b.votes - a.votes)

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotesSorted.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={addAnecdotes}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default App