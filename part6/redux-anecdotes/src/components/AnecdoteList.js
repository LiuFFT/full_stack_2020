import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {votes} from "../reducers/anecdoteReducer";

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(votes(id))
    }

    const anecdotesSorted = [...anecdotes]
    anecdotesSorted.sort((a, b) => b.votes - a.votes)

    return (
        <div>
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
        </div>
    )
}

export default AnecdoteList