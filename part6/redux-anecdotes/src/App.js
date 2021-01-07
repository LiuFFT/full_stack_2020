import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const getId = () => (100000 * Math.random()).toFixed(0)

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch({
            type: 'VOTE',
            data: { id }
        })
    }

    const addAnecdotes = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch({
            type: 'ADD_ANECDOTE',
            data: {
                content: content,
                id: getId(),
                votes: 0
            }
        })
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