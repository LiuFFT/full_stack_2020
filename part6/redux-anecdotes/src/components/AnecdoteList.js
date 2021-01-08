import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {votes} from "../reducers/anecdoteReducer";
import {notification} from "../reducers/notificationReducer";


const Anecdote = ({anecdote, handleVote}) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote =  (id) => {
        dispatch(votes(id))
        const a = anecdotes.find(ane => ane.id === id)
        dispatch(notification(`You voted '${a.content}'`))
    }

    const anecdotesSorted = [...anecdotes]
    anecdotesSorted.sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {anecdotesSorted.map(anecdote =>
                <Anecdote anecdote={anecdote} key={anecdote.id} handleVote={()=>vote(anecdote.id)}/>
            )}
        </div>
    )
}

export default AnecdoteList